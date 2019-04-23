/* eslint-disable max-len, no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { List, fromJS } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import styled from 'util/style'
import { hasWindow } from 'util/dom'
import { getCenterAndZoom, toGeoJSONPoints, groupByLayer } from 'util/map'

import Legend from './Legend'
import {
  config,
  sources,
  layers,
  legends,
  boundaryLayer,
  bioticLayer,
} from '../../../config/map'

const Relative = styled.div`
  position: relative;
  flex: 1 0 auto;
`

const MapNote = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 4rem;
  right: 4rem;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 2px 6px #666;
`

const Map = ({
  data,
  selectedFeature,
  bounds,
  location,
  onSelectFeature,
  onBoundsChange,
}) => {
  console.log('map render')

  // if there is no window, we cannot render this component
  if (!hasWindow) {
    return null
  }

  const mapNode = useRef(null)
  const mapRef = useRef(null)
  const selectedFeatureRef = useRef(selectedFeature)
  const [legendEntries, setLegendEntries] = useState([])

  useEffect(() => {
    const { accessToken, styleID, padding, bounds: initBounds } = config

    let { center, zoom } = config

    const targetBounds = bounds.isEmpty() ? initBounds : bounds.toJS()

    // If bounds are available, use these to establish center and zoom when map first loads
    if (targetBounds && targetBounds.length === 4) {
      const {
        current: { offsetWidth, offsetHeight },
      } = mapNode

      const { center: boundsCenter, zoom: boundsZoom } = getCenterAndZoom(
        targetBounds,
        offsetWidth,
        offsetHeight,
        padding
      )
      center = boundsCenter
      zoom = boundsZoom
    }

    mapboxgl.accessToken = accessToken

    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/mapbox/${styleID}`,
      center: center || [0, 0],
      zoom: zoom || 0,
      minZoom: config.minZoom || 0,
    })
    mapRef.current = map
    window.map = map

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Construct GeoJSON points from data
    sources.points.data = data ? toGeoJSONPoints(data.toJS()) : []

    map.on('load', () => {
      // add sources
      Object.entries(sources).forEach(([id, source]) => {
        map.addSource(id, source)
      })

      // add layers
      layers.forEach(layer => {
        map.addLayer(layer)
      })

      // wait a second to force rerender with legend
      // setTimeout(() => setIsLoaded(true), 1000)
    })

    map.on('click', e => {
      const [feature] = map.queryRenderedFeatures(e.point, {
        layers: ['points', 'boundaries-fill'],
      })
      console.log('clicked features, first is', feature)

      if (!feature) return
      const {
        layer: { id: layerId },
        properties,
      } = feature

      if (layerId === 'points') {
        onSelectFeature(properties.id)
      } else {
        onSelectFeature(properties[boundaryLayer.idProperty])
      }
    })

    // clicking on clusters zooms in
    map.on('click', 'clusters', e => {
      const [feature] = map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      })
      map
        .getSource('points')
        .getClusterExpansionZoom(
          feature.properties.cluster_id,
          (err, targetZoom) => {
            if (err) return

            map.easeTo({
              center: feature.geometry.coordinates,
              zoom: targetZoom + 1,
            })
          }
        )
    })

    // show tooltip for clusters
    const tooltip = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      anchor: 'left',
      offset: 20,
    })
    map.on('mouseenter', 'clusters', e => {
      map.getCanvas().style.cursor = 'pointer'

      const [feature] = map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      })
      const clusterId = feature.properties.cluster_id

      // highlight
      map.setFilter('points-highlight', [
        '==',
        ['get', 'cluster_id'],
        clusterId,
      ])

      map
        .getSource('points')
        .getClusterLeaves(clusterId, Infinity, 0, (err, children) => {
          if (err) return

          let names = children
            .slice(0, 5)
            .map(({ properties: { name } }) => name)
            .join('<br/>')
          if (children.length > 5) {
            names += `<br/>and ${children.length - 5} more...`
          }

          tooltip
            .setLngLat(feature.geometry.coordinates)
            .setHTML(names)
            .addTo(map)
        })
    })
    map.on('mouseleave', 'clusters', () => {
      map.getCanvas().style.cursor = ''
      map.setFilter('points-highlight', [
        '==',
        'id',
        selectedFeatureRef.current || Infinity,
      ])
      tooltip.remove()
    })

    // show tooltip for single points
    map.on('mouseenter', 'points', e => {
      map.getCanvas().style.cursor = 'pointer'

      const [feature] = map.queryRenderedFeatures(e.point, {
        layers: ['points'],
      })

      map.setFilter('points-highlight', [
        'any',
        ['==', 'id', feature.properties.id],
        ['==', 'id', selectedFeatureRef.current || Infinity],
      ])

      tooltip
        .setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.name)
        .addTo(map)
    })
    map.on('mouseleave', 'points', () => {
      map.getCanvas().style.cursor = ''
      map.setFilter('points-highlight', [
        '==',
        'id',
        selectedFeatureRef.current || Infinity,
      ])
      tooltip.remove()
    })

    map.on('moveend', () => {
      const [lowerLeft, upperRight] = map.getBounds().toArray()
      onBoundsChange(lowerLeft.concat(upperRight))
    })

    map.on('idle', () => {
      // update legend after drawing layers
      setLegendEntries(getLegendEntries())
    })

    return () => {
      map.remove()
    }
  }, [])

  // Update clusters when the filtered data change
  useEffect(() => {
    const { current: map } = mapRef
    if (!(map && map.isStyleLoaded())) return

    const geoJSON = data ? toGeoJSONPoints(data.toJS()) : []
    map.getSource('points').setData(geoJSON)

    // TODO: set filter on the estuary boundaries?
  }, [data])

  // Update selected point / polygon
  useEffect(() => {
    selectedFeatureRef.current = selectedFeature

    const { current: map } = mapRef
    if (!(map && map.isStyleLoaded())) return

    map.setFilter('points-highlight', ['==', 'id', selectedFeature || Infinity])
    map.setFilter('boundaries-outline-highlight', [
      '==',
      ['get', boundaryLayer.idProperty],
      selectedFeature || Infinity,
    ])
  }, [selectedFeature])

  // Update bounds to match incoming bounds
  useEffect(() => {
    if (!bounds.isEmpty()) {
      const { current: map } = mapRef

      if (!map) return

      map.fitBounds(bounds.toJS(), { padding: 20, maxZoom: 14, duration: 2000 })
    }
  }, [bounds])

  // memoize this?
  const getLegendEntries = () => {
    const { current: map } = mapRef
    if (!(map && map.isStyleLoaded())) return []

    // Group layers with visible features
    const visibleFeatures = map.queryRenderedFeatures({
      layers: ['clusters', 'points', 'boundaries-fill', 'biotics-fill'],
    })
    const grouped = groupByLayer(visibleFeatures)

    // only show point or boundary for estuaries when in view
    if (grouped.points && grouped['boundaries-fill']) {
      delete grouped.points
    }

    let entries = []
    Object.entries(grouped)
      .sort(([leftLayer], [rightLayer]) => (leftLayer > rightLayer ? 1 : -1))
      .forEach(([layer, features]) => {
        if (legends[layer]) {
          entries = entries.concat(legends[layer].getLegend(features))
        }
      })

    return entries
  }

  return (
    <Relative>
      {/* <MapNote ref={noteNode} /> */}
      <div ref={mapNode} style={{ width: '100%', height: '100%' }} />
      <Legend entries={legendEntries} />
    </Relative>
  )
}

Map.propTypes = {
  data: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    })
  ).isRequired,
  bounds: ImmutablePropTypes.listOf(PropTypes.number),
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  selectedFeature: PropTypes.number,
  onSelectFeature: PropTypes.func,
  onBoundsChange: PropTypes.func,
}

Map.defaultProps = {
  bounds: List(),
  location: null,
  selectedFeature: null,
  onSelectFeature: () => {},
  onBoundsChange: () => {},
}

export default Map

// T0DO: features must have an ID
// highlight boundaries on hover
// map.on('mouseenter', 'boundaries-fill', e => {
//   const [feature] = map.queryRenderedFeatures(e.point, {
//     layers: ['boundaries-fill'],
//   })

//   map.setFilter('boundaries-outline-highlight', [
//     '==',
//     ['get', 'id'],
//     feature.properties.id,
//   ])
// })
// map.on('mouseleave', 'boundaries-fill', () => {
//   map.setFilter('boundaries-outline-highlight', [
//     '==',
//     ['get', 'id'],
//     Infinity,
//   ])
// })

// useEffect(() => {
//   console.log('grid changed', grid)

//   const { current: map } = mapRef
//   if (!map.loaded()) return

//   // clear out any previous highlights
//   layers.forEach(({ id }) => {
//     updateHighlight(id, null)
//   })

//   layers.forEach(({ id }) => {
//     map.setLayoutProperty(id, 'visibility', grid === id ? 'visible' : 'none')
//   })

//   // update zoom in note
//   if (gridRef.current === 'na_grts' && map.getZoom() < 5) {
//     noteNode.current.innerHTML = 'Zoom in further to see GRTS grid...'
//   } else {
//     noteNode.current.innerHTML = ''
//   }
// }, [grid])

// const updateHighlight = (gridID, id) => {
//   const { current: map } = mapRef
//   const layer = `${gridID}-highlight`

//   if (id !== null) {
//     map.setPaintProperty(layer, 'fill-color', [
//       'match',
//       ['get', 'id'],
//       id,
//       '#b5676d',
//       TRANSPARENT,
//     ])
//   } else {
//     map.setPaintProperty(layer, 'fill-color', TRANSPARENT)
//   }
// }

// const getFeatureAtPoint = point => {
//   const { current: map } = mapRef
//   const { current: curGrid } = gridRef

//   if (!(map && curGrid)) return null

//   const [feature] = map.queryRenderedFeatures(point, {
//     layers: [`${curGrid}-highlight`],
//   })
//   if (feature) {
//     console.log('got feature at point', feature)
//     updateHighlight(curGrid, feature.properties.id)
//     onSelectFeature(feature.properties)
//   }
//   return feature
// }

// useEffect(() => {
//   const { current: map } = mapRef
//   const { current: marker } = markerRef

//   if (!map.loaded()) return

//   if (location !== null) {
//     onSelectFeature(null)
//     const { latitude, longitude } = location
//     map.flyTo({ center: [longitude, latitude], zoom: 10 })

//     map.once('moveend', () => {
//       const point = map.project([longitude, latitude])
//       const feature = getFeatureAtPoint(point)
//       // source may still be loading, try again in 1 second
//       if (!feature) {
//         setTimeout(() => {
//           getFeatureAtPoint(point)
//         }, 1000)
//       }
//     })

//     if (!marker) {
//       markerRef.current = new mapboxgl.Marker()
//         .setLngLat([longitude, latitude])
//         .addTo(map)
//     } else {
//       marker.setLngLat([longitude, latitude])
//     }
//   } else if (marker) {
//     marker.remove()
//     markerRef.current = null
//   }
// }, [location])

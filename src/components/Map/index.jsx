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
import StyleSelector from './StyleSelector'
import LayerToggle from './LayerToggle'
import {
  config,
  sources,
  layers,
  legends,
  boundaryLayer,
} from '../../../config/map'

const Relative = styled.div`
  position: relative;
  flex: 1 0 auto;
`

const Map = ({
  data,
  selectedFeature,
  bounds,
  onSelectFeature,
  onBoundsChange,
}) => {
  // if there is no window, we cannot render this component
  if (!hasWindow) {
    return null
  }

  const { accessToken, styles } = config

  const mapNode = useRef(null)
  const mapRef = useRef(null)
  const baseStyleRef = useRef(null)
  const selectedFeatureRef = useRef(selectedFeature)
  const [legendEntries, setLegendEntries] = useState([])
  const [activeLayer, setActiveLayer] = useState('biotics') // options are biotics and tw

  useEffect(() => {
    const { padding, bounds: initBounds } = config

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
      style: `mapbox://styles/mapbox/${styles[0]}`,
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
      // snapshot existing map config
      baseStyleRef.current = fromJS(map.getStyle())
      window.baseStyle = baseStyleRef.current

      // add sources
      Object.entries(sources).forEach(([id, source]) => {
        map.addSource(id, source)
      })

      // add layers
      layers.forEach(layer => {
        map.addLayer(layer)
      })
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

    const queryLayers = [
      'biotics-fill',
      'tw-fill',
      'boundaries-fill',
      'boundaries-outline-highlight',
      'clusters',
      'points',
    ]

    // Create an index that preserves the above order for sorting
    const layerIndex = { ...queryLayers }

    // Group layers with visible features
    const visibleFeatures = map.queryRenderedFeatures({ layers: queryLayers })
    const grouped = groupByLayer(visibleFeatures)

    // only show point or boundary for estuaries when in view, not both
    // if fill is visible, show that
    if (grouped.points && grouped['boundaries-fill']) {
      delete grouped.points
    }

    let entries = []
    Object.entries(grouped)
      .sort(([leftLayer], [rightLayer]) =>
        layerIndex[leftLayer] > layerIndex[rightLayer] ? -1 : 1
      )
      .forEach(([layer, features]) => {
        if (legends[layer]) {
          entries = entries.concat(legends[layer].getLegend(features))
        }
      })

    return entries
  }

  const handleLayerToggle = newLayer => {
    const { current: map } = mapRef

    if (!map) return

    setActiveLayer(newLayer)

    const isBiotics = newLayer === 'biotics'
    map.setLayoutProperty(
      'biotics-fill',
      'visibility',
      isBiotics ? 'visible' : 'none'
    )
    map.setLayoutProperty(
      'tw-fill',
      'visibility',
      isBiotics ? 'none' : 'visible'
    )
  }

  const handleBasemapChange = styleID => {
    const { current: map } = mapRef
    const { current: baseStyle } = baseStyleRef

    const snapshot = fromJS(map.getStyle())
    const baseSources = baseStyle.get('sources')
    const baseLayers = baseStyle.get('layers')

    // diff the sources and layers to find those added by the user
    const userSources = snapshot
      .get('sources')
      .filter((_, key) => !baseSources.has(key))
    const userLayers = snapshot
      .get('layers')
      .filter(layer => !baseLayers.includes(layer))

    map.setStyle(`mapbox://styles/mapbox/${styleID}`)

    map.once('style.load', () => {
      // after new style has loaded
      // save it so that we can diff with it on next change
      // and re-add the sources / layers back on it

      // save base for new style
      baseStyleRef.current = fromJS(map.getStyle())

      userSources.forEach((source, id) => {
        map.addSource(id, source.toJS())
      })

      userLayers.forEach(layer => {
        map.addLayer(layer.toJS())
      })
    })
  }

  return (
    <Relative>
      <div ref={mapNode} style={{ width: '100%', height: '100%' }} />

      <LayerToggle
        value={activeLayer}
        options={[
          { value: 'biotics', label: 'Estuarine Biotic Habitat' },
          { value: 'tw', label: 'Tidal Wetland Loss' },
        ]}
        onChange={handleLayerToggle}
      />

      <Legend entries={legendEntries} />
      {mapRef.current && mapRef.current.isStyleLoaded && (
        <StyleSelector
          styles={styles}
          token={accessToken}
          onChange={handleBasemapChange}
        />
      )}
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
  selectedFeature: PropTypes.number,
  onSelectFeature: PropTypes.func,
  onBoundsChange: PropTypes.func,
}

Map.defaultProps = {
  bounds: List(),
  selectedFeature: null,
  onSelectFeature: () => {},
  onBoundsChange: () => {},
}

export default Map

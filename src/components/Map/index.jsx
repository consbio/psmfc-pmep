/* eslint-disable max-len, no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { List, fromJS } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Box } from 'theme-ui'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { hasWindow } from 'util/dom'
import { indexBy } from 'util/data'
import { getCenterAndZoom, toGeoJSONPoints, groupByLayer } from 'util/map'

import Legend from './Legend'
import StyleSelector from './StyleSelector'
import LayerToggle from './LayerToggle'
import FullExtentButton from './FullExtentButton'
import {
  config,
  sources,
  layers,
  legends,
  boundaryLayer,
  twLayer,
} from '../../../config/map'
import { bioticInfo, twInfo } from '../../../config/constants'

const renderTooltipContent = (title, color, label) =>
  `
  <b>${title}</b><br/>
  <div style="display:inline-block; width:1rem; height:1rem; background-color:${color}99;">&nbsp;</div>
  <div style="display: inline-block;">${label}</div>
  `

const Map = ({
  data,
  selectedFeature,
  bounds,
  location,
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
  const indexRef = useRef(null)
  const fullDataCount = useRef(null) // set to full size of data array on first mount, this is a shortcut to know if data are filtered
  const selectedFeatureRef = useRef(selectedFeature)
  const locationMarkerRef = useRef(null)
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
    indexRef.current = data ? indexBy(data.toJS(), 'id') : null
    fullDataCount.current = data ? data.count() : 0

    map.on('load', () => {
      // snapshot existing map config
      baseStyleRef.current = fromJS(map.getStyle())
      window.baseStyle = baseStyleRef.current

      // add sources
      Object.entries(sources).forEach(([id, source]) => {
        map.addSource(id, source)
      })

      // add layers
      layers.forEach((layer) => {
        map.addLayer(layer)
      })
    })

    map.on('click', (e) => {
      const [feature] = map.queryRenderedFeatures(e.point, {
        layers: ['points', 'boundaries-fill'],
      })

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
    map.on('click', 'clusters', (e) => {
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
    map.on('mouseenter', 'clusters', ({ features: [feature] }) => {
      map.getCanvas().style.cursor = 'pointer'

      const clusterId = feature.properties.cluster_id

      // highlight
      map.setFilter('points-hover', ['==', ['get', 'cluster_id'], clusterId])

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
      map.setFilter('points-hover', ['==', 'id', Infinity])
      tooltip.remove()
    })

    // show tooltip for single points
    map.on('mouseenter', 'points', ({ features: [feature] }) => {
      map.getCanvas().style.cursor = 'pointer'

      map.setFilter('points-hover', ['==', 'id', feature.properties.id])

      tooltip
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<b>${feature.properties.name}</b>`)
        .addTo(map)
    })
    map.on('mouseleave', 'points', () => {
      map.getCanvas().style.cursor = ''
      map.setFilter('points-hover', ['==', 'id', Infinity])
      tooltip.remove()
    })

    // show tooltip for boundaries
    map.on('mousemove', 'boundaries-fill', ({ point, features: [feature] }) => {
      if (map.getZoom() < 10) return

      map.getCanvas().style.cursor = 'pointer'

      const {
        properties: { PMEP_EstuaryID },
      } = feature

      if (!indexRef.current[PMEP_EstuaryID]) {
        console.error('Could not fetch data for estuary', PMEP_EstuaryID)
        return
      }

      tooltip
        .setLngLat(map.unproject(point))
        .setHTML(`<b>${indexRef.current[PMEP_EstuaryID].name}</b>`)
        .addTo(map)
    })

    map.on('mouseleave', 'boundaries-fill', () => {
      map.getCanvas().style.cursor = ''
      tooltip.remove()
    })

    // setup tooltip for biotic data
    map.on('mousemove', 'biotics-fill', ({ point, features: [feature] }) => {
      if (map.getZoom() < 10) return

      map.getCanvas().style.cursor = 'pointer'

      const {
        properties: { CMECS_BC_Code, PMEP_EstuaryID },
      } = feature

      if (!CMECS_BC_Code) return

      if (!indexRef.current[PMEP_EstuaryID]) {
        console.error('Could not fetch data for estuary', PMEP_EstuaryID)
        return
      }

      const { color, label } = bioticInfo[CMECS_BC_Code]

      tooltip
        .setLngLat(map.unproject(point))
        .setHTML(
          renderTooltipContent(
            indexRef.current[PMEP_EstuaryID].name,
            color,
            label
          )
        )
        .addTo(map)
    })

    map.on('mouseleave', 'biotics-fill', () => {
      map.getCanvas().style.cursor = ''
      tooltip.remove()
    })

    // setup tooltip for tidal wetland loss data
    map.on('mousemove', 'tw-fill', ({ point, features: [feature] }) => {
      map.getCanvas().style.cursor = 'pointer'

      const {
        properties: { TWL_Type, PMEP_EstuaryID },
      } = feature

      if (!indexRef.current[PMEP_EstuaryID]) {
        console.error('Could not fetch data for estuary', PMEP_EstuaryID)
        return
      }

      tooltip
        .setLngLat(map.unproject(point))
        .setHTML(
          renderTooltipContent(
            indexRef.current[PMEP_EstuaryID].name,
            twInfo[TWL_Type].color,
            `Tidal wetlands ${TWL_Type}`
          )
        )
        .addTo(map)
    })

    map.on('mouseleave', 'tw-fill', () => {
      map.getCanvas().style.cursor = ''
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
      removeLocationMarker()
      map.remove()
    }
  }, [])

  // Update map when the filtered data change
  // also note that this fires when the map first mounts
  useEffect(() => {
    const { current: map } = mapRef
    if (!(map && map.isStyleLoaded())) return

    const records = data.toJS()

    // update clusters / points
    // note: we have to update the data to force rebuilding of clusters
    const geoJSON = data ? toGeoJSONPoints(records) : []
    map.getSource('points').setData(geoJSON)

    // update map layers based on state of filters
    // note: TWL is a special case because we need to filter out N/A as well
    const filterLayers = [
      'boundaries-fill',
      'boundaries-outline',
      'biotics-fill',
      'biotics-boundary',
    ]

    if (records.length < fullDataCount.current) {
      const ids = records.map(({ id }) => id)
      const filterExpr = ['in', ['get', 'PMEP_EstuaryID'], ['literal', ids]]

      filterLayers.forEach((id) => {
        map.setFilter(id, filterExpr)
      })

      map.setFilter('tw-fill', [
        'all',
        ['!=', ['get', twLayer.idProperty], 'N/A'],
        filterExpr,
      ])
    } else {
      // reset filters
      filterLayers.forEach((id) => {
        map.setFilter(id, null)
      })

      map.setFilter('tw-fill', ['!=', ['get', twLayer.idProperty], 'N/A'])
    }
  }, [data])

  // Update selected point / polygon
  useEffect(() => {
    selectedFeatureRef.current = selectedFeature

    const { current: map } = mapRef
    if (!(map && map.isStyleLoaded())) return

    if (selectedFeature === null) {
      removeLocationMarker()
      map.setFilter('points', ['!', ['has', 'point_count']])
    } else {
      if (!indexRef.current[selectedFeature]) return

      const { lon, lat } = indexRef.current[selectedFeature]

      if (locationMarkerRef.current === null) {
        locationMarkerRef.current = new mapboxgl.Marker({
          color: '#ee7d14',
        })
          .setLngLat([lon, lat])
          .addTo(map)
      } else {
        locationMarkerRef.current.setLngLat([lon, lat])
      }

      map.setFilter('points', [
        'all',
        ['!', ['has', 'point_count']],
        ['!=', ['get', 'id'], selectedFeature],
      ])
    }

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

  useEffect(() => {
    if (!location) return
    const { current: map } = mapRef

    if (!map) return

    map.panTo(location)
  }, [location])

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

  const handleLayerToggle = (newLayer) => {
    const { current: map } = mapRef

    if (!(map && map.isStyleLoaded)) return

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

  const handleBasemapChange = (styleID) => {
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
      .filter((layer) => !baseLayers.includes(layer))

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

      userLayers.forEach((layer) => {
        map.addLayer(layer.toJS())
      })
    })
  }

  const goToFullExtent = () => {
    const { current: map } = mapRef

    if (!(map && map.isStyleLoaded)) return

    map.fitBounds(config.bounds, { padding: 20, duration: 1000 })
  }

  const removeLocationMarker = () => {
    if (locationMarkerRef.current !== null) {
      locationMarkerRef.current.remove()
      locationMarkerRef.current = null
    }
  }

  return (
    <Box sx={{ position: 'relative', flex: '1 0 auto', zIndex: 1 }}>
      <div ref={mapNode} style={{ width: '100%', height: '100%' }} />

      <Legend entries={legendEntries} />
      {mapRef.current && mapRef.current.isStyleLoaded && (
        <>
          <LayerToggle
            value={activeLayer}
            options={[
              { value: 'biotics', label: 'Estuarine Biotic Habitat' },
              { value: 'tw', label: 'Tidal Wetland Loss' },
            ]}
            onChange={handleLayerToggle}
          />
          <StyleSelector
            styles={styles}
            token={accessToken}
            onChange={handleBasemapChange}
          />
          <FullExtentButton onClick={goToFullExtent} />
        </>
      )}
    </Box>
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
  location: PropTypes.arrayOf(PropTypes.number),
  selectedFeature: PropTypes.number,
  onSelectFeature: PropTypes.func,
  onBoundsChange: PropTypes.func,
}

Map.defaultProps = {
  bounds: List(),
  selectedFeature: null,
  location: null,
  onSelectFeature: () => {},
  onBoundsChange: () => {},
}

export default Map

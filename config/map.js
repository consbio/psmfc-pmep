import { bioticInfo } from './constants'

export const transparentColor = 'rgba(0,0,0,0)'
export const boundaryColor = '#a18ac9'
export const selectedColor = '#ee7d14'

// Boundaries vector tile source information
const boundaries = {
  tileURL:
    'https://tiles.arcgis.com/tiles/kpMKjjLr8H1rZ4XO/arcgis/rest/services/PMEP_Estuary_Extent_Vector_Tiles/VectorTileServer/tile/{z}/{y}/{x}.pbf',
  sourceLayer: 'PMEP Estuary Extent:1',
}

// CMECS biotics vector tile source information
const biotics = {
  tileURL:
    'https://tiles.arcgis.com/tiles/kpMKjjLr8H1rZ4XO/arcgis/rest/services/West_Coast_USA_Estuarine_Biotic_Habitat_vector_tiles/VectorTileServer/tile/{z}/{y}/{x}.pbf',
  sourceLayer: 'West Coast USA Estuarine Biotic Habitat',
}

// Mapbox public token.  TODO: migrate to .env setting
const mapboxToken =
  'pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ'

// extract biotic code and color info into Mapbox style expression
// so that we can style the layer based on code
// structure is: [code, color, code2, color2, ...]
let bioticStyle = []
Object.values(bioticInfo).forEach(({ vtID, color }) => {
  bioticStyle = bioticStyle.concat([vtID, color])
})
// final entry must be the default color
bioticStyle.push(transparentColor)

/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
  accessToken: mapboxToken,
  // center: [-120.9, 40.75],
  // zoom: 4,
  bounds: [-124.7, 32.5, -117.1, 49],
  minZoom: 1.75,
  styleID: 'light-v9',
  padding: 0.1, // padding around bounds as a proportion
  sources: {
    boundaries: {
      type: 'vector',
      tiles: [boundaries.tileURL],
      minzoom: 4,
      maxzoom: 19,
      tileSize: 512,
    },
    biotics: {
      type: 'vector',
      tiles: [biotics.tileURL],
      minzoom: 5,
      maxzoom: 14,
      tileSize: 512,
    },
    points: {
      type: 'geojson',
      data: {},
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 45,
    },
  },
  layers: [
    {
      id: 'boundaries-fill',
      source: 'boundaries',
      'source-layer': boundaries.sourceLayer,
      minzoom: 4,
      maxzoom: 22,
      type: 'fill',
      paint: {
        'fill-opacity': {
          stops: [[5, 1], [7, 0.5], [10, 0.1]],
        },
        'fill-color': boundaryColor,
      },
    },
    {
      id: 'boundaries-outline',
      source: 'boundaries',
      'source-layer': boundaries.sourceLayer,
      minzoom: 4,
      maxzoom: 22,
      type: 'line',
      paint: {
        'line-width': {
          base: 0.1,
          stops: [[5, 0.1], [8, 0.5], [10, 1], [12, 1.5]],
        },
        'line-opacity': {
          stops: [[5, 0.1], [7, 0.5], [10, 1]],
        },
        'line-color': boundaryColor,
      },
    },
    {
      id: 'biotics-fill',
      source: 'biotics',
      'source-layer': biotics.sourceLayer,
      minzoom: 10,
      maxzoom: 22,
      type: 'fill',
      paint: {
        'fill-opacity': 0.5,
        'fill-color': ['match', ['get', '_symbol'], ...bioticStyle],
      },
    },
    {
      id: 'clusters',
      type: 'circle',
      source: 'points',
      filter: ['has', 'point_count'], // field added by mapbox GL
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#74a9cf',
          10,
          '#2b8cbe',
          100,
          '#045a8d',
        ],
        'circle-stroke-color': [
          'step',
          ['get', 'point_count'],
          '#2b8cbe',
          10,
          '#045a8d',
          100,
          '#000',
        ],
        'circle-stroke-width': 1,
        'circle-radius': ['step', ['get', 'point_count'], 12, 10, 20, 100, 25],
      },
    },
    {
      id: 'clusters-count',
      type: 'symbol',
      source: 'points',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-size': 12,
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      },
      paint: {
        'text-color': '#FFFFFF',
        'text-opacity': 1,
        'text-halo-color': '#000',
        'text-halo-blur': 1,
        'text-halo-width': 0.5,
      },
    },
    {
      id: 'points', // unclustered points
      type: 'circle',
      source: 'points',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#a18ac9',
        'circle-radius': 12,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
      },
    },
  ],
}

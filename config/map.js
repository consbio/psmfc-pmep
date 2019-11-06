import { createSteps } from 'util/map'
import { flatten } from 'util/data'
import { bioticInfo, twInfo, PNWBounds } from './constants'
import { siteMetadata } from '../gatsby-config'

export const transparentColor = 'rgba(0,0,0,0)'
export const boundaryColor = '#a18ac9'
export const highlightColor = '#ee7d14'
export const defaultRadius = 12

/* --------- Vector tile source information --------- */
export const boundaryLayer = {
  tileURL:
    'https://tiles.arcgis.com/tiles/kpMKjjLr8H1rZ4XO/arcgis/rest/services/PMEP_Estuary_Extent_Vector_Tiles_flat_20190517/VectorTileServer/tile/{z}/{y}/{x}.pbf',
  sourceLayer: 'West Coast USA Current and Historical Estuary Extent',
  idProperty: 'PMEP_EstuaryID',
}

// CMECS biotics vector tile source information
export const bioticLayer = {
  tileURL:
    'https://tiles.arcgis.com/tiles/kpMKjjLr8H1rZ4XO/arcgis/rest/services/PMEP_Biotic_Component_VectorTilePackage_V1_2_dissolved/VectorTileServer/tile/{z}/{y}/{x}.pbf',
  sourceLayer: 'West Coast USA Estuarine Biotic Habitat',
  idProperty: 'CMECS_BC_Code',
}

// Tidal wetland loss and restoration source information
export const twLayer = {
  tileURL:
    'https://honu.psmfc.org/server/rest/services/Hosted/PMEP_Tidal_Wetlands_Loss_Summary_V2/VectorTileServer/tile/{z}/{y}/{x}.pbf',
  sourceLayer: 'PMEP_Tidal_Wetlands_Loss_Summary_V2',
  idProperty: 'TWL_Type',
}

/* --------- Cluster information --------- */
const clusters = [
  {
    threshold: 10,
    label: '< 10 estuaries',
    color: '#74a9cf',
    borderColor: '#2b8cbe',
    radius: defaultRadius,
  },
  {
    threshold: 100,
    label: '10 - 100 estuaries',
    color: '#2b8cbe',
    borderColor: '#045a8d',
    radius: 20,
  },
  {
    threshold: Infinity,
    label: '> 100 estuaries',
    color: '#045a8d',
    borderColor: '#000',
    radius: 25,
  },
]
const clusterRadii = createSteps(clusters, 'radius')

// extract biotic code and color info into Mapbox style expression
// so that we can style the layer based on code
// structure is: [code, color, code2, color2, ...]
// final entry must be the default color
const bioticStyle = flatten(
  Object.entries(bioticInfo).map(([key, { color }]) => [key, color])
).concat(transparentColor)

const twStyle = flatten(
  Object.entries(twInfo).map(([key, { color }]) => [key, color])
).concat(transparentColor)

/**
 * Map configuration information used to construct map and populate layers
 */
export const config = {
  accessToken: siteMetadata.mapboxToken,
  bounds: PNWBounds,
  minZoom: 1.75,
  styles: ['light-v9', 'satellite-streets-v11', 'streets-v11'],
  padding: 0.1, // padding around bounds as a proportion
}

export const sources = {
  boundaries: {
    type: 'vector',
    tiles: [boundaryLayer.tileURL],
    minzoom: 4,
    maxzoom: 15,
    tileSize: 512,
  },
  biotics: {
    type: 'vector',
    tiles: [bioticLayer.tileURL],
    minzoom: 5,
    maxzoom: 15,
    tileSize: 512,
  },
  tidalWetlands: {
    type: 'vector',
    tiles: [twLayer.tileURL],
    minzoom: 5,
    maxzoom: 15,
    tileSize: 512,
  },
  points: {
    type: 'geojson',
    data: {},
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 45,
  },
}

export const layers = [
  {
    id: 'boundaries-fill',
    source: 'boundaries',
    'source-layer': boundaryLayer.sourceLayer,
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
    id: 'biotics-fill',
    source: 'biotics',
    'source-layer': bioticLayer.sourceLayer,
    minzoom: 7.5,
    maxzoom: 22,
    type: 'fill',

    paint: {
      'fill-opacity': {
        base: 1,
        stops: [[7.5, 0.1], [9, 0.5]],
      },
      'fill-color': ['match', ['get', bioticLayer.idProperty], ...bioticStyle],
    },
  },
  {
    id: 'biotics-boundary',
    source: 'biotics',
    'source-layer': bioticLayer.sourceLayer,
    minzoom: 7.5,
    maxzoom: 22,
    type: 'line',
    paint: {
      'line-width': {
        base: 0.1,
        stops: [[5, 0.1], [8, 0.5], [10, 1]],
      },
      'line-opacity': {
        stops: [[5, 0.1], [7, 0.5], [10, 1]],
      },
      'line-color': '#AAA',
    },
  },
  {
    id: 'tw-fill',
    source: 'tidalWetlands',
    'source-layer': twLayer.sourceLayer,
    minzoom: 7.5,
    maxzoom: 22,
    type: 'fill',
    filter: ['!=', ['get', twLayer.idProperty], 'N/A'],
    layout: {
      visibility: 'none',
    },
    paint: {
      'fill-opacity': {
        base: 1,
        stops: [[7.5, 0.1], [9, 0.5]],
      },
      'fill-color': ['match', ['get', twLayer.idProperty], ...twStyle],
    },
  },
  {
    id: 'boundaries-outline',
    source: 'boundaries',
    'source-layer': boundaryLayer.sourceLayer,
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
    id: 'boundaries-outline-highlight',
    source: 'boundaries',
    'source-layer': boundaryLayer.sourceLayer,
    minzoom: 4,
    maxzoom: 22,
    type: 'line',
    filter: ['==', ['get', boundaryLayer.idProperty], Infinity],
    paint: {
      'line-width': {
        base: 1,
        stops: [[5, 1], [12, 3]],
      },
      'line-opacity': {
        stops: [[5, 0.5], [8, 1]],
      },
      'line-color': highlightColor,
    },
  },
  {
    id: 'clusters',
    type: 'circle',
    source: 'points',
    filter: ['has', 'point_count'], // point_count field added by mapbox GL
    paint: {
      'circle-color': [
        'step',
        ['get', 'point_count'],
        ...createSteps(clusters, 'color'),
      ],
      'circle-stroke-color': [
        'step',
        ['get', 'point_count'],
        ...createSteps(clusters, 'borderColor'),
      ],
      'circle-stroke-width': 1,
      'circle-radius': ['step', ['get', 'point_count'], ...clusterRadii],
    },
  },

  {
    id: 'points', // unclustered points
    type: 'circle',
    source: 'points',
    maxzoom: 15,
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': boundaryColor,
      'circle-radius': {
        base: 12,
        stops: [[5, defaultRadius], [14, 10]],
      },
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    },
  },
  {
    id: 'points-highlight',
    type: 'circle',
    source: 'points',
    maxzoom: 15,
    filter: ['==', 'id', Infinity],
    paint: {
      'circle-color': highlightColor,
      'circle-stroke-color': highlightColor,
      'circle-stroke-width': 4,
      // if a cluster, use cluster sizes above, else use the point size above
      'circle-radius': [
        'case',
        ['has', 'point_count'],
        ['step', ['get', 'point_count'], ...clusterRadii],
        defaultRadius,
      ],
    },
  },
  {
    id: 'clusters-label',
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
]

export const legends = {
  clusters: {
    getLegend: features => {
      const clusterThresholds = clusters.map(({ threshold }) => threshold)

      // extract unique sizes and sort from largest to smallest
      const sizes = Array.from(
        new Set(
          features.map(({ properties: { point_count: count } }) => {
            // find the matching cluster threshold
            let i = 0
            for (; i < clusterThresholds.length; i += 1) {
              if (count < clusterThresholds[i]) break
            }
            return i
          })
        )
      )
        .sort()
        .reverse()

      return sizes.map(size => {
        const { label, color, borderColor, radius } = clusters[size]
        return {
          type: 'circle',
          radius, // scale down so that it fits in 20px container
          color,
          borderColor,
          borderWidth: 1,
          label,
        }
      })
    },
  },
  points: {
    getLegend: () => [
      {
        type: 'circle',
        radius: defaultRadius,
        label: 'Estuary',
        color: boundaryColor,
        borderColor: '#FFF',
        borderWidth: 1,
      },
    ],
  },
  'boundaries-fill': {
    getLegend: () => [
      {
        type: 'fill',
        label: 'Estuary boundary',
        color: `${boundaryColor}55`, // make partly transparent
        borderColor: boundaryColor,
        borderWidth: 2,
      },
    ],
  },
  'boundaries-outline-highlight': {
    getLegend: () => [
      {
        type: 'fill',
        label: 'Selected estuary',
        borderColor: highlightColor,
        borderWidth: 2,
      },
    ],
  },
  'biotics-fill': {
    getLegend: features => {
      // extract unique biotic codes and sort in ascending order
      const codes = Array.from(
        new Set(
          features.map(({ properties }) => properties[bioticLayer.idProperty])
        )
      ).sort()

      return codes.map(code => {
        const { label, color } = bioticInfo[code]
        return {
          type: 'fill',
          label,
          color: `${color}99`,
        }
      })
    },
  },
  'tw-fill': {
    getLegend: () =>
      Object.entries(twInfo)
        .sort(([, { label: left }], [, { label: right }]) =>
          left < right ? -1 : 1
        )
        .map(([key, { label, color }]) => ({
          type: 'fill',
          label: `Tidal wetlands ${label}`,
          color: `${color}99`, // add a bit of transparency to mute color
        })),
  },
}

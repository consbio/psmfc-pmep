import { bioticInfo } from '../../../config/constants'

export const transparentColor = 'rgba(0,0,0,0)'
export const boundaryColor = '#a18ac9'
export const selectedColor = '#ee7d14'

// extract biotic info into Mapbox style expression
let bioticStyle = []
Object.values(bioticInfo).forEach(({ vtID, color }) => {
  bioticStyle = bioticStyle.concat([vtID, color])
})
// final entry must be the default color
bioticStyle.push(transparentColor)

export const config = {
  // Mapbox public token.  TODO: migrate to .env setting
  accessToken:
    'pk.eyJ1IjoiYmN3YXJkIiwiYSI6InJ5NzUxQzAifQ.CVyzbyOpnStfYUQ_6r8AgQ',
  center: [-120.9, 40.75],
  zoom: 4,
  minZoom: 1.75,
  styleID: 'light-v9',
  padding: 0.1, // padding around bounds as a proportion
  sources: {
    boundaries: {
      type: 'vector',
      tiles: [
        'https://tiles.arcgis.com/tiles/kpMKjjLr8H1rZ4XO/arcgis/rest/services/PMEP_Estuary_Extent_Vector_Tiles/VectorTileServer/tile/{z}/{y}/{x}.pbf',
      ],
      minzoom: 4,
      maxzoom: 19,
      tileSize: 512,
    },
    biotics: {
      type: 'vector',
      tiles: [
        'https://tiles.arcgis.com/tiles/kpMKjjLr8H1rZ4XO/arcgis/rest/services/West_Coast_USA_Estuarine_Biotic_Habitat_vector_tiles/VectorTileServer/tile/{z}/{y}/{x}.pbf',
      ],
      minzoom: 5,
      maxzoom: 14,
      tileSize: 512,
    },
  },
  layers: [
    {
      id: 'boundaries-fill',
      source: 'boundaries',
      'source-layer': 'PMEP Estuary Extent:1',
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
      'source-layer': 'PMEP Estuary Extent:1',
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
      'source-layer': 'West Coast USA Estuarine Biotic Habitat',
      minzoom: 10,
      maxzoom: 22,
      type: 'fill',
      paint: {
        'fill-opacity': 0.5,
        'fill-color': ['match', ['get', '_symbol'], ...bioticStyle],
      },
    },
  ],
}

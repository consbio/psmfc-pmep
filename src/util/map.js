import geoViewport from '@mapbox/geo-viewport'

/**
 * Calculate the appropriate center and zoom to fit the bounds, given padding.
 * @param {Array(number)} bounds - [xmin, ymin, xmax, ymax]
 * @param {int} width - width of the map node in pixels
 * @param {int} height - height of the map node in pixels
 * @param {float} padding - proportion of calculated zoom level to zoom out by, to pad the bounds
 */
export const getCenterAndZoom = (bounds, width, height, padding = 0) => {
  const viewport = geoViewport.viewport(
    bounds,
    [width, height],
    undefined,
    undefined,
    undefined,
    true
  )

  // Zoom out slightly to pad around bounds

  const zoom = Math.max(viewport.zoom - 1, 0) * (1 - padding)

  return { center: viewport.center, zoom }
}

export const boundsOverlap = (
  [xmin, ymin, xmax, ymax],
  [xmin2, ymin2, xmax2, ymax2]
) => ymax2 >= ymin && ymin2 <= ymax && xmax2 >= xmin && xmin2 <= xmax

export const toGeoJSONPoint = (record, x = 'lon', y = 'lat') => {
  const properties = {}
  Object.keys(record)
    .filter(f => f !== x && f !== y)
    .forEach(f => {
      properties[f] = record[f]
    })

  const feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [record[x], record[y]],
    },
    properties,
  }

  const { id } = record
  if (id !== undefined && id !== null) {
    feature.id = id
  }

  return feature
}

export const toGeoJSONPoints = records => ({
  type: 'FeatureCollection',
  features: records.map(r => toGeoJSONPoint(r)),
})

/**
 * Group features from map by layer ID returning count and optional values.
 * properties is a mapping of layer ID to a getter function for that property: {layer: (featureProperties => property),...}
 */
export const groupByLayer = (features, properties = {}) => {
  const results = {}
  features.forEach(({ layer: { id }, properties: featureProperties }) => {
    if (!results[id]) {
      results[id] = {
        count: 0,
        values: [],
      }
    }
    results[id].count += 1

    const getProp = properties[id]
    if (getProp) {
      results[id].values.push(getProp(featureProperties))
    }
  })

  return results
}

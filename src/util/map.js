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

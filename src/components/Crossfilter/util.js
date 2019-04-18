import { Map } from 'immutable'

// Get counts based on current filters
export const countByDimension = dimensions => {
  let dimCounts = Map()

  // only generate counts for the non-internal filters
  Object.values(dimensions)
    .filter(({ config: { internal } }) => !internal)
    .forEach(dimension => {
      const grouped = dimension.group().all()

      // Convert the array of key:count returned by crossfilter to a Map
      const counts = grouped.reduce((result, item) => {
        if (item) {
          return result.set(item.key, item.value)
        }
        return result
      }, Map())

      dimCounts = dimCounts.set(dimension.config.field, counts)
    })
  return dimCounts
}

export const countFiltered = cf =>
  cf
    .groupAll()
    .reduceCount()
    .value()

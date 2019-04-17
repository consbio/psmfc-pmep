import { boundsOverlap } from 'util/map'

// const getIntKeys = obj =>
// Object.keys(obj)
//     .map(k => parseInt(k, 10))
//     .sort()

/**
 * Filter configuration.
 * Each filter must have: {name, }
 *
 * Optional properties:
 * `getValue` (function) - takes a record as input, and transforms the value as needed.
 * `internal` (bool) - if `true` will not be displayed in the list of filters, but will still be added as a filter.
 */
export const filters = [
  {
    field: 'name',
    internal: true,
    getValue: ({ name }) => name.toLowerCase(),
    filterFunc: value => name => name.includes(value),
  },
  {
    field: 'bounds',
    internal: true,
    filterFunc: mapBounds => estuaryBounds =>
      boundsOverlap(mapBounds, estuaryBounds),
  },
]

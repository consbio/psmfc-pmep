import { boundsOverlap } from 'util/map'
import {
  estuaryTypes,
  sizeClasses,
  sizeClassLabels,
  regions,
  states,
  stateNames,
  nfhpCodes,
  nfhpLabels,
} from './constants'

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

// TODO: migrate this into crossfilter reducer as the default
// returns true if passed in values contains the value
// values must be a Set
const hasValue = values => value => values.has(value)

export const filters = [
  {
    field: 'name',
    internal: true, // TODO: lack of a label also indicates this
    getValue: ({ name }) => name.toLowerCase(),
    filterFunc: value => name => name.includes(value),
  },
  {
    field: 'bounds',
    internal: true,
    filterFunc: mapBounds => estuaryBounds =>
      boundsOverlap(mapBounds, estuaryBounds),
  },
  {
    field: 'type',
    title: 'Estuary Type',
    values: estuaryTypes,
    labels: estuaryTypes,
    filterFunc: hasValue,
  },
  {
    field: 'sizeClass',
    title: 'Estuary Size Class',
    values: sizeClasses.map((_, idx) => idx), // we only need to know the index
    labels: sizeClassLabels,
    filterFunc: hasValue,
  },
  {
    field: 'region',
    title: 'PMEP Region',
    values: regions,
    labels: regions,
    filterFunc: hasValue,
  },
  {
    field: 'state',
    title: 'State',
    values: states,
    labels: states.map(state => stateNames[state]),
    filterFunc: hasValue,
  },
  {
    field: 'Rating_2015',
    title: 'Risk of Fish Habitat Degradation (2015)',
    values: nfhpCodes,
    labels: nfhpLabels,
    filterFunc: hasValue,
    open: true,
  },
]

import { boundsOverlap } from 'util/map'
import { splitWords } from 'util/format'
import { classify } from 'util/data'
import {
  estuaryTypes,
  sizeClasses,
  sizeClassLabels,
  regions,
  states,
  stateNames,
  nfhpCodes,
  nfhpLabels,
  species,
  bioticTypes,
  bioticInfo,
  sppCountClasses,
  sppCountClassLabels,
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
const hasValue = filterValues => value => filterValues.has(value)

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
    getValue: ({ acres }) => classify(acres, sizeClasses),
    filterFunc: hasValue,
  },
  {
    field: 'speciesPresent',
    title: 'Focal Species Present',
    values: species,
    labels: species.map(splitWords),
    filterFunc: hasValue,
    isArray: true,
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
    isArray: true, // TODO: handle this
  },
  {
    field: 'numSpps',
    title: 'Number of Focal Species Present',
    values: sppCountClasses,
    labels: sppCountClassLabels,
    getValue: ({ SoKJoin, speciesPresent }) => {
      // if SoKJoin == 3, this is not inventoried
      if (SoKJoin === 3) return -1

      const count = speciesPresent.length
      if (count >= 10) return 10
      if (count >= 6) return 6
      if (count > 0) return 1
      return 0
    },
    filterFunc: hasValue,
  },
  {
    field: 'biotic',
    title: 'Estuarine Biotic Habitats Present',
    values: bioticTypes,
    labels: bioticTypes.map(b => bioticInfo[b].label),
    getValue: ({ biotic }) => Object.keys(biotic),
    filterFunc: hasValue,
    isArray: true,
  },
  {
    field: 'Rating_2015',
    title: 'Risk of Fish Habitat Degradation (2015)',
    values: nfhpCodes,
    labels: nfhpLabels,
    filterFunc: hasValue,
  },
]

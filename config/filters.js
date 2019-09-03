import { Map } from 'immutable'

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
  twlBins,
  twlBinLabels,
  twrLabels,
} from './constants'

/**
 * Filter configuration.
 * Each non-internal field is shown to the user in the order defined below.
 *
 * IMPORTANT: each record is an `immutableJS` `Map` object - you must use `Map`
 * methods for retrieving field values.
 * See: https://immutable-js.github.io/immutable-js/docs/#/Map
 *
 *
 * Each filter must have: `{field, filterFunc}`
 *
 * `field` - the name of the field in the record.
 *
 * `filterFunc` (function) - a function that takes as input a list of filter
 * values selected by the user, and returns a function that
 * takes a value from each record in the data and returns true
 * if the value is included in the filter and false otherwise.
 *
 *
 * Each filter that is displayed using filter bars (`internal: false`)
 * must have: `{values, labels}` as well.
 *
 * Optional properties:
 * `isOpen` (bool) - if `true` show the filter in expanded state by default.  (default: `false`)
 *
 * `getValue` (function) - takes a record as input and returns
 * the value for that field.  It can transform the value as needed.
 * (default: returns the value for the `field`)
 * NOTE: `getValue` MUST return a native JS type, NOT an `immutableJS` type.
 *
 * `internal` (bool) - if `true` will not be displayed in the list
 * of filters shown to the user, but will still be added as a
 * filter (e.g., map bounds for filtering records).  (default: `false`)
 *
 * `isArray` - if `true`, the record has an array of values for that field
 * instead of a single value.  Crossfilter will index that record on each of those
 * values, so you can test the record to determine if it is in the filter in
 * the same way that you would test a field with a singular value.
 * See: https://github.com/crossfilter/crossfilter/wiki/API-Reference#dimension_with_arrays
 *
 * NOTE: `List` objects for this field will be automatically converted to native `Array`s by default unless
 * you provide your own `getValue` function.  If so, you MUST return a native `Array`.
 */

// TODO: migrate this into crossfilter reducer as the default
// returns true if passed in values contains the value
// values must be a Set
const hasValue = filterValues => value => filterValues.has(value)

export const filters = [
  {
    field: 'name',
    internal: true,
    getValue: record => record.get('name').toLowerCase(),
    filterFunc: value => name => name.includes(value.toLowerCase()),
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
    values: Object.keys(estuaryTypes).map(type => parseInt(type, 10)),
    labels: Object.values(estuaryTypes).map(({ label }) => label),
    filterFunc: hasValue,
  },
  {
    field: 'sizeClass',
    title: 'Estuary Size Class',
    values: sizeClasses.map((_, idx) => idx), // store the index of the size class for filtering
    labels: sizeClassLabels,
    getValue: record => classify(record.get('acres'), sizeClasses),
    filterFunc: hasValue,
  },
  {
    field: 'species',
    title: 'Focal Species Present',
    values: species,
    labels: species.map(splitWords),
    // getValue: record => record.get('species').map(spp => spp.split(':')[0]),
    getValue: record =>
      record
        .get('species', Map())
        .keySeq()
        .toArray(),
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
    values: states.map(state => stateNames[state]),
    labels: states.map(state => stateNames[state]),
    // index the estuaries that cross state boundaries in each state
    getValue: record => stateNames[record.get('state')].split(' / '),
    filterFunc: hasValue,
    isArray: true,
  },
  {
    field: 'numSpps',
    title: 'Number of Focal Species Present',
    values: sppCountClasses,
    labels: sppCountClassLabels,
    getValue: record => {
      // if SoKJoin == 3, this is not inventoried
      if (record.get('SoKJoin') === 3) return -1

      const count = record.get('species', Map()).size
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
    // flatten the keys of the biotic types present into an Array
    getValue: record =>
      record
        .get('biotic', Map())
        .keySeq()
        .toArray(),
    filterFunc: hasValue,
    isArray: true,
  },
  {
    field: 'twl',
    title: 'Tidal Wetland Loss',
    getValue: record => {
      const twAcres = record.get('twAcres')
      const twlAcres = record.get('twlAcres')

      // 999 means not assessed
      const percent = twAcres ? Math.min(100, (100 * twlAcres) / twAcres) : 999
      return twlBins.findIndex(bin => percent < bin)
    },
    // store the index of the bin
    values: twlBins.map((_, i) => i),
    labels: twlBinLabels,
    filterFunc: hasValue,
  },
  {
    field: 'twr',
    title: 'Tidal Wetland Restoration',
    getValue: record => {
      if (!record.get('twAcres')) return 2 // Not assessed
      if (!record.get('twrAcres')) return 1 // No restoration
      return 0
    },
    // store the index of the bin
    values: [0, 1, 2],
    labels: twrLabels,
    filterFunc: hasValue,
  },
  {
    field: 'nfhp2015',
    title: 'Risk of Fish Habitat Degradation (2015)',
    values: nfhpCodes,
    labels: nfhpLabels,
    filterFunc: hasValue,
  },
]

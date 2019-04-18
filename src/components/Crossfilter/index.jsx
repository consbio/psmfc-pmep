import { useReducer, useRef } from 'react'
import Crossfilter from 'crossfilter2'
import { Map, fromJS } from 'immutable'

import { isDebug } from 'util/dom'

// Actions
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS'
export const SET_FILTER = 'SET_FILTER' // payload is {field, filterValue}
export const RESET_FILTER = 'RESET_FILTER'

// Get counts based on current filters
const countByDimension = dimensions => {
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

const countFiltered = cf =>
  cf
    .groupAll()
    .reduceCount()
    .value()

export const useCrossfilter = (data, filters) => {
  const crossfilterRef = useRef(null)
  const dimensionsRef = useRef(null)

  // payload: {type: "SOME_TYPE", payload: <the_data>}
  const reducer = (
    state,
    { type, payload: { field, filterValue, ...payload } }
  ) => {
    const { current: crossfilter } = crossfilterRef
    const { current: dimensions } = dimensionsRef

    console.log(`Handling ${type}`, payload)
    console.log('Prev state', state.toJS())

    let newState = state

    switch (type) {
      case SET_FILTER: {
        const dimension = dimensions[field]
        const filterFunc = dimension.config.filterFunc(filterValue)
        if (filterValue) {
          dimension.filterFunction(filterFunc)
        } else {
          // clear filter on field
          dimension.filterAll()
        }

        newState = state.merge({
          data: fromJS(crossfilter.allFiltered()),
          dimensionCounts: countByDimension(dimensions),
          filteredCount: countFiltered(crossfilter),
          filters: state.get('filters').set(field, filterValue),
        })
        break
      }

      case RESET_FILTER: {
        break
      }
      case CLEAR_ALL_FILTERS: {
        break
      }

      default: {
        console.error('unhandled action type', type)
        break
      }
    }

    console.log('Next state', newState.toJS())

    return newState
  }

  // Initialize crossfilter and dimensions when useReducer is first setup
  const initialize = () => {
    const crossfilter = Crossfilter(data)

    const dimensions = {}
    filters.forEach(filter => {
      const { field, dimensionIsArray = false, getValue } = filter
      // default is identify function for field
      const dimensionFunction = getValue || (d => d[field])
      const dimension = crossfilter.dimension(
        dimensionFunction,
        !!dimensionIsArray
      )
      dimension.config = filter
      dimensions[field] = dimension
    })

    crossfilterRef.current = crossfilter
    dimensionsRef.current = dimensions

    if (isDebug) {
      window.crossfilter = crossfilter
      window.dimensions = dimensions
    }

    // initial state
    return Map({
      data: fromJS(data),
      filters: Map(),
      dimensionCounts: Map(),
      filteredCount: countFiltered(crossfilter),
      total: data.length,
    })
  }

  return useReducer(reducer, undefined, initialize)
}

import { useEffect, useReducer } from 'react'
import Crossfilter from 'crossfilter2'
import { Map, List, fromJS } from 'immutable'

import { isDebug } from 'util/dom'

// Get counts based on current filters
const countByDimension = dimensions => {
  let dimCounts = Map()

  dimensions.forEach(d => {
    const grouped = d.group().all()

    // Convert the array of key:count returned by crossfilter to a Map
    const counts = grouped.reduce((result, item) => {
      if (item) {
        return result.set(item.key, item.value)
      }
      return result
    }, Map())

    dimCounts = dimCounts.set(d.config.field, counts)
  })
  return dimCounts
}

const countFiltered = cf =>
  cf
    .groupAll()
    .reduceCount()
    .value()

export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS'
export const SET_FILTER = 'SET_FILTER' // payload is {field, filterValue}
export const RESET_FILTER = 'RESET_FILTER'

/**
 *
 * @param {object} state - state object
 * @param {object} action - object containing type and payload: {type: "SOME_TYPE", payload: <the_data>}
 */

export const useCrossfilter = (data, filters) => {
  console.log('setting up crossfilter')

  useEffect(() => {
    console.log('in crossfilter effect')
  }, [data, filters])

  const crossfilter = Crossfilter(data)

  const dimensionIndex = {}
  const dimensions = filters.map(
    ({ field, dimensionIsArray = false, getValue, ...config }) => {
      // default is identify function for field
      const dimensionFunction = getValue || (d => d[field])
      const dimension = crossfilter.dimension(
        dimensionFunction,
        !!dimensionIsArray
      )
      dimension.config = config
      dimensionIndex[field] = dimension

      return dimension
    }
  )

  if (isDebug) {
    window.crossfilter = crossfilter
    window.dimensions = dimensions
  }

  const reducer = (
    state,
    { type, payload: { field, filterValue, ...payload } }
  ) => {
    console.log(`Handling ${type}`, payload)
    console.log('Prev state', state.toJS())

    const newState = state

    switch (type) {
      case SET_FILTER: {
        const dimension = dimensionIndex[field]
        const filterFunc = dimension.config.filterFunc(filterValue)
        if (filterValue) {
          dimension.filterFunction(filterFunc)
        } else {
          // clear filter on field
          dimension.filterAll()
        }

        // newState = state.merge({
        //   data: fromJS(crossfilter.allFiltered()),
        //   dimensionCounts: countByDimension(dimensions),
        //   filteredCount: countFiltered(crossfilter),
        //   filters: state.get('filters').set(field, filterValue),
        // })
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

  const initialState = Map({
    data: fromJS(data),
    filters: Map(),
    dimensionCounts: Map(),
    filteredCount: countFiltered(crossfilter),
    total: 0,
  })

  return useReducer(reducer, initialState)
}

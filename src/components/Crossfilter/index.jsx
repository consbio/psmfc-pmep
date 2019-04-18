import React, { createContext, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Map, fromJS } from 'immutable'

import Crossfilter from 'crossfilter2'
import { isDebug } from 'util/dom'
import { countByDimension, countFiltered } from './util'

// Actions
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS'
export const SET_FILTER = 'SET_FILTER' // payload is {field, filterValue}
export const RESET_FILTER = 'RESET_FILTER'

// Incoming data is an immutable List of Maps
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

        if (!filterValue || filterValue.size === 0) {
          // clear filter on field
          dimension.filterAll()
        } else {
          const filterFunc = dimension.config.filterFunc(filterValue)
          dimension.filterFunction(filterFunc)
        }

        newState = state.merge({
          data: fromJS(crossfilter.allFiltered()), // TODO: can we avoid type conversion here?
          dimensionCounts: countByDimension(dimensions),
          filteredCount: countFiltered(crossfilter),
          filters: state.get('filters').set(field, filterValue),
        })
        break
      }

      // Redundant with passing in empty Map/Set above
      // case RESET_FILTER: {
      //   const dimension = dimensions[field]
      //   dimension.filterAll()

      //   newState = state.merge({
      //     data: fromJS(crossfilter.allFiltered()), // TODO: can we avoid type conversion here?
      //     dimensionCounts: countByDimension(dimensions),
      //     filteredCount: countFiltered(crossfilter),
      //     filters: state.get('filters').set(field, filterValue),
      //   })
      //   break
      // }
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
    const crossfilter = Crossfilter(data.toJS())

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
      data,
      filters: Map(),
      dimensionCounts: countByDimension(dimensions),
      filteredCount: countFiltered(crossfilter),
      total: data.size,
    })
  }

  return useReducer(reducer, undefined, initialize)
}

export const Context = createContext()
export const Provider = ({ data, filters, children }) => {
  const [state, dispatch] = useCrossfilter(data, filters)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

Provider.propTypes = {
  data: ImmutablePropTypes.list.isRequired,
  filters: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
}

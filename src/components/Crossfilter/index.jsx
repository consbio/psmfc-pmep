import React, { createContext, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Map, List } from 'immutable'

import Crossfilter from 'crossfilter2'
import { isDebug } from 'util/dom'
import { countByDimension, countFiltered } from './util'

// Actions
export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS'
export const SET_FILTER = 'SET_FILTER' // payload is {field, filterValue}

// Incoming data is an immutableJS List of Maps
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
          // there are no filter values, so clear filter on this field
          dimension.filterAll()
        } else {
          const filterFunc = dimension.config.filterFunc(filterValue)
          dimension.filterFunction(filterFunc)
        }

        console.log('allfiltered', crossfilter.allFiltered())
        console.log(
          'type check',
          crossfilter.allFiltered()[0].get('speciesPresent')
        )

        newState = state.merge({
          // convert Array from crossfilter back to an immutable List
          data: List(crossfilter.allFiltered()),
          dimensionCounts: countByDimension(dimensions),
          filteredCount: countFiltered(crossfilter),
          filters: state.get('filters').set(field, filterValue),
        })
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
    // crossfilter depends on Array methods at the top level
    // so we shallowly convert the List to an Array.
    const crossfilter = Crossfilter(data.toArray())

    const dimensions = {}
    filters.forEach(filter => {
      const { field, isArray, getValue } = filter
      // default `getValue` function is identify function for field
      // const dimensionFunction = getValue || (d => d[field])
      const dimensionFunction =
        getValue ||
        (record => {
          const value = record.get(field)
          // if incoming value is an immutableJS object, convert it to JS first
          if (value && value.toJS !== undefined) {
            return value.toJS()
          }
          return value
        })
      const dimension = crossfilter.dimension(dimensionFunction, !!isArray)
      dimension.config = filter
      dimensions[field] = dimension

      console.log('added dimension', dimension.group().top(Infinity))
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

/**
 * Provide Crossfilter as a context so that components deeper in the
 * component tree can access crossfilter state or dispatch.
 */
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

import { useReducer } from 'react'
import Crossfilter from 'crossfilter2'
import { Map, List } from 'immutable'

// // Get counts based on current filters
// const countByDimension = dimensions => {
//     let dimCounts = Map()

//     dimensions.forEach(d => {
//         const grouped = d.group().all()

//         // Convert the array of key:count returned by crossfilter to a Map
//         const counts = grouped.reduce((result, item) => {
//             if (item) {
//                 return result.set(item.key, item.value)
//             }
//             return result
//         }, Map())

//         dimCounts = dimCounts.set(d.config.field, counts)
//     })
//     return dimCounts
// }

// const countFiltered = cf =>
//     cf
//         .groupAll()
//         .reduceCount()
//         .value()

export const CLEAR_ALL_FILTERS = 'CLEAR_ALL_FILTERS'
export const SET_FILTER = 'SET_FILTER'
export const RESET_FILTER = 'RESET_FILTER'

const initialState = Map({})

/**
 *
 * @param {object} state - state object
 * @param {object} action - object containing type and payload: {type: "SOME_TYPE", payload: <the_data>}
 */
const reducer = (state, { type, payload }) => {
  console.log('in reducer, prev state', state, payload)

  switch (type) {
    case SET_FILTER: {
      return null // TODO
    }

    case RESET_FILTER: {
      return null // TODO
    }
    case CLEAR_ALL_FILTERS: {
      return null // TODO
    }

    default: {
      console.error('unhandled action type', type)
      return state
    }
  }
}

export const useCrossfilter = (data, filters) => {
  console.log('setting up crossfilter')

  const crossfilter = Crossfilter(data)

  const dimensions = filters.map(filter => {
    const { field, dimensionIsArray = false } = filter

    // default is identify function for field
    const dimensionFunction = filter.getValue || (d => d[field])
    const dimension = crossfilter.dimension(
      dimensionFunction,
      !!dimensionIsArray
    )
    dimension.config = filter
    return dimension
  })

  // debugging only!
  window.crossfilter = crossfilter
  window.dimensions = dimensions

  const [state, dispatch] = useReducer(reducer, initialState)

  return [state, dispatch]
}

/** A wrapper for the map to inject context from crossfilter so that the map doesn't need to know anything about crossfilter */

import React, { useContext } from 'react'

import Map from 'components/Map'
import { SET_FILTER } from './Crossfilter'
import { Context } from './Context'

const FilteredMap = props => {
  const { state, dispatch } = useContext(Context)

  const handleBoundsChange = bounds => {
    // TODO: persist bounds and convert to immutable throughout stack
    dispatch({
      type: SET_FILTER,
      payload: {
        field: 'bounds',
        filterValue: bounds,
      },
    })
  }

  return (
    <Map
      data={state.get('data')}
      onBoundsChange={handleBoundsChange}
      {...props}
    />
  )
}

export default FilteredMap

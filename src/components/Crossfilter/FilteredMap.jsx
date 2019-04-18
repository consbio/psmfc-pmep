/** A wrapper for the map to inject context from crossfilter so that the map doesn't need to know anything about crossfilter */

import React, { useContext } from 'react'

import {
  Context as CrossfilterContext,
  SET_FILTER,
} from 'components/Crossfilter'
import Map from 'components/Map'

const FilteredMap = () => {
  const { state, dispatch } = useContext(CrossfilterContext)

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

  return <Map data={state.get('data')} onBoundsChange={handleBoundsChange} />
}

export default FilteredMap

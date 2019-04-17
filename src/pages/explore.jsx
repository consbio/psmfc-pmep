import React, { useState } from 'react'

import { useData } from 'components/Data'
import { useCrossfilter, SET_FILTER } from 'components/Crossfilter'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import Map from 'components/Map'
import Sidebar from 'components/Sidebar'
import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import EstuariesList from 'components/EstuariesList'
import styled from 'util/style'
import { filters } from '../../config/filters'

const Wrapper = styled(Flex)`
  height: 100%;
`

const StyledHelpText = styled(HelpText)`
  padding: 0 1rem;
  margin-bottom: 1rem;
`

const Explore = () => {
  console.log('render explore')

  const [data, index] = useData()
  const [state, dispatch] = useCrossfilter(data, filters)

  const filteredData = state
    .get('data')
    .toJS()
    .slice() // slice into a new copy since we are sorting data elsewhere

  const handleQueryChange = query => {
    dispatch({
      type: SET_FILTER,
      payload: {
        field: 'name',
        filterValue: query,
      },
    })
  }

  const handleBoundsChange = bounds => {
    dispatch({
      type: SET_FILTER,
      payload: {
        field: 'bounds',
        filterValue: bounds,
      },
    })
  }

  const handleSelect = id => {
    console.log('onSelect', id)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <Sidebar icon="binoculars" title="Explore Estuaries">
          <StyledHelpText>
            Click on an estuary in the list below or in the map for more
            detailed information. Estuary boundaries will show on the map when
            you have zoomed far enough in. This list only shows estuaries
            visible in the map.
          </StyledHelpText>

          <EstuariesList
            data={filteredData.slice()}
            onQueryChange={handleQueryChange}
            onSelect={handleSelect}
          />
        </Sidebar>
        <Map onBoundsChange={handleBoundsChange} />
      </Wrapper>
    </Layout>
  )
}

export default Explore

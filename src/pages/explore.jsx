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

const Explore = () => {
  console.log('render explore')

  const [data, index] = useData()
  const [filterState, filterDispatch] = useCrossfilter(data, filters)

  const filteredData = filterState.get('data')

  const handleQueryChange = query => {
    filterDispatch({
      type: SET_FILTER,
      payload: {
        field: 'name',
        filterValue: query,
      },
    })
  }

  const handleBoundsChange = bounds => {
    // TODO: persist bounds and convert to immutable throughout stack
    filterDispatch({
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
        <Sidebar
          icon="binoculars"
          title="Explore Estuaries"
          allowScroll={false}
        >
          <HelpText mb="1rem" px="1rem">
            Click on an estuary in the list below or in the map for more
            detailed information. Estuary boundaries will show on the map when
            you have zoomed far enough in. This list only shows estuaries
            visible in the map.
          </HelpText>

          <EstuariesList
            data={filteredData}
            onQueryChange={handleQueryChange}
            onSelect={handleSelect}
          />
        </Sidebar>
        <Map data={filteredData} onBoundsChange={handleBoundsChange} />
      </Wrapper>
    </Layout>
  )
}

export default Explore

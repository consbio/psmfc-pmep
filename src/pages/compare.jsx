import React, { useState, useContext } from 'react'

import { useData } from 'components/Data'
import { Provider as CrossfilterProvider } from 'components/Crossfilter'
import FilteredMap from 'components/Crossfilter/FilteredMap'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
// import Map from 'components/Map'
import Sidebar from 'components/Sidebar'
import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import FiltersList from 'components/FiltersList'
import styled from 'util/style'
import { filters } from '../../config/filters'

const Wrapper = styled(Flex)`
  height: 100%;
`

const Compare = () => {
  const [data, index] = useData()

  return (
    <CrossfilterProvider data={data} filters={filters}>
      <Layout>
        <SEO title="Home" />
        <Wrapper>
          <Sidebar icon="slidersH" title="Compare Estuaries">
            <HelpText mb="1rem" px="1rem">
              The charts below show estuaries within the extent of the map that
              meet each of the filters you set. Click on one or more filter bars
              to select all estuaries that match. Filters can also be combined
              across groups, such as &quot;Riverine Estuary&quot;, &quot;0-25
              acres&quot;, &quot;Washington&quot; to show all small riverine
              estuaries in Washington state. Select multiple categories within a
              group to show estuaries that meet any of those conditions. As you
              zoom in, the charts will update based on the extent of the map
              <br />
              Click on an estuary in the map for more information.
            </HelpText>
            <FiltersList />
          </Sidebar>

          <FilteredMap />
        </Wrapper>
      </Layout>
    </CrossfilterProvider>
  )
}

export default Compare

import React, { useState } from 'react'

import { useData } from 'components/Data'
import { useCrossfilter } from 'components/Crossfilter'
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
  const [data, index] = useData()
  const [state, dispatch] = useCrossfilter(data, filters)

  const filteredData = data.slice() // TODO: filter

  return (
    <Layout>
      <SEO title="Home" />
      <Wrapper>
        <Sidebar icon="binoculars" title="Explore Estuaries">
          <HelpText>
            Click on an estuary in the list below or in the map for more
            detailed information. Estuary boundaries will show on the map when
            you have zoomed far enough in. This list only shows estuaries
            visible in the map.
          </HelpText>

          <EstuariesList data={filteredData} />
        </Sidebar>
        <Map />
      </Wrapper>
    </Layout>
  )
}

export default Explore

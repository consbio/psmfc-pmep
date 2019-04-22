import React, { useState } from 'react'

import { useData } from 'components/Data'
import {
  Provider as CrossfilterProvider,
  FilteredMap,
} from 'components/Crossfilter'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import { Flex } from 'components/Grid'
import Sidebar, { SidebarHeader, SidebarHelp } from 'components/Sidebar'
import EstuariesList from 'components/EstuariesList'
import EstuaryDetails from 'components/EstuaryDetails'
import styled from 'util/style'
import { filters } from '../../config/filters'

const Wrapper = styled(Flex)`
  height: 100%;
`

const Explore = () => {
  console.log('render explore')

  const [data, index] = useData()
  const [selectedId, setSelectedId] = useState(1148)

  const handleSelect = id => {
    console.log('onSelect', id)
    setSelectedId(id)
  }

  return (
    <CrossfilterProvider data={data} filters={filters}>
      <Layout>
        <SEO title="Explore" />
        <Wrapper>
          <Sidebar allowScroll={false}>
            {selectedId !== null ? (
              <EstuaryDetails
                {...index.get(selectedId.toString()).toJS()}
                onBack={() => handleSelect(null)}
              />
            ) : (
              <>
                <SidebarHeader title="Explore Estuaries" icon="binoculars" />
                <SidebarHelp>
                  Click on an estuary in the list below or in the map for more
                  detailed information. Estuary boundaries will show on the map
                  when you have zoomed far enough in. This list only shows
                  estuaries visible in the map.
                </SidebarHelp>
                <EstuariesList onSelect={handleSelect} />
              </>
            )}
          </Sidebar>
          <FilteredMap onSelectFeature={handleSelect} />
        </Wrapper>
      </Layout>
    </CrossfilterProvider>
  )
}

export default Explore

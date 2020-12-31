import React, { useState, useRef } from 'react'
import { List } from 'immutable'

import { useData } from 'components/Data'
import {
  Provider as CrossfilterProvider,
  FilteredMap,
} from 'components/Crossfilter'
import Layout from 'components/Layout'
import ExpandableParagraph from 'components/elements/ExpandableParagraph'
import SEO from 'components/SEO'
import Sidebar, { SidebarHeader } from 'components/Sidebar'
import EstuaryDetails from 'components/EstuaryDetails'
import { Box, Flex } from 'components/Grid'
import FiltersList from 'components/FiltersList'
import styled, { themeGet } from 'util/style'
import { PNWBounds } from '../../config/constants'
import { filters } from '../../config/filters'

const Wrapper = styled(Flex)`
  height: 100%;
`


const Help = styled(ExpandableParagraph)`
  font-size: 0.8rem;
  margin: 0 1rem 1rem;
  color: ${themeGet('colors.grey.700')};
`

const Compare = () => {
  const [data, index] = useData()
  const [selectedId, setSelectedId] = useState(null)
  const [bounds, setBounds] = useState(List(PNWBounds))

  const handleSelect = id => {
    console.log('onSelect', id)
    setSelectedId(id)
  }

  const handleZoomTo = () => {
    setBounds(() => index.get(selectedId.toString()).get('bounds'))
  }

  const handleBack = () => {
    setSelectedId(null)
  }

  return (
    <CrossfilterProvider data={data} filters={filters}>
      <Layout>
        <SEO title="Compare" />
        <Wrapper>
          <Sidebar allowScroll={false}>
            {selectedId !== null ? (
              <EstuaryDetails
                {...index.get(selectedId.toString()).toJS()}
                onBack={handleBack}
                onZoomTo={handleZoomTo}
              />
            ) : (
              <>
                <Box flex={0}>
                  <SidebarHeader icon="slidersH" title="Compare Estuaries" />
                  <Help snippet="Use the filters below to select estuaries that meet your criteria within the map...">
                    Use the filters below to select estuaries that meet your
                    criteria within the map. The filter bars show you how many
                    estuaries visible in the map meet each criterion. You can
                    click on one or more filter bars to select all estuaries
                    that match. Filters can also be combined across groups, such
                    as &quot;Riverine Estuary&quot;, &quot;0-25 acres&quot;,
                    &quot;Washington&quot; to show all small riverine estuaries
                    in Washington state. Select multiple categories within a
                    group to show estuaries that meet any of those conditions.
                    As you zoom in, the charts will update based on the extent
                    of the map. Estuary boundaries will show on the map when you
                    have zoomed far enough in.
                    <br />
                    <br />
                    Click on an estuary in the map for more detailed information
                    about it.
                  </Help>
                </Box>
                <FiltersList />
              </>
            )}
          </Sidebar>

          <FilteredMap
            bounds={bounds}
            selectedFeature={selectedId}
            onSelectFeature={handleSelect}
          />
        </Wrapper>
      </Layout>
    </CrossfilterProvider>
  )
}

export default Compare

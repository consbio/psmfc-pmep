import React, { useState, useRef } from 'react'
import { List } from 'immutable'

import { useData } from 'components/Data'
import {
  Provider as CrossfilterProvider,
  FilteredMap,
} from 'components/Crossfilter'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import { Flex } from 'components/Grid'
import Sidebar, { SidebarHeader } from 'components/Sidebar'
import ExpandableParagraph from 'components/elements/ExpandableParagraph'
import EstuariesList from 'components/EstuariesList'
import EstuaryDetails from 'components/EstuaryDetails'
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

const Explore = () => {
  const [data, index] = useData()
  const [selectedId, setSelectedId] = useState(null)
  const [bounds, setBounds] = useState(List(PNWBounds))
  const [location, setLocation] = useState(null)

  const handleSelect = (id) => {
    console.log('onSelect', id)
    setSelectedId(() => id)
  }

  const handleSelectFromList = (id) => {
    const record = index.get(id.toString())
    setLocation(() => [record.get('lon'), record.get('lat')])
    handleSelect(id)
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
        <SEO title="Explore" />
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
                <SidebarHeader title="Explore Estuaries" icon="explore" />
                <Help
                  snippet="Click on an estuary in the list below or in the map for more
                  detailed information..."
                >
                  Click on an estuary in the list below or in the map for more
                  detailed information. Estuary boundaries will show on the map
                  when you have zoomed far enough in. This list only shows
                  estuaries visible in the map.
                </Help>
                <EstuariesList onSelect={handleSelectFromList} />
              </>
            )}
          </Sidebar>
          <FilteredMap
            bounds={bounds}
            location={location}
            selectedFeature={selectedId}
            onSelectFeature={handleSelect}
          />
        </Wrapper>
      </Layout>
    </CrossfilterProvider>
  )
}

export default Explore

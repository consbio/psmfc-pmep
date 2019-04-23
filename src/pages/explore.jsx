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
  console.log('render explore')

  const [data, index] = useData()
  const [selectedId, setSelectedId] = useState(null)
  const boundsRef = useRef(PNWBounds) // store bounds so they are updated without rerendering
  const [{ prevBounds, nextBounds }, setBounds] = useState({
    prevBounds: List(PNWBounds),
  })
  const [showZoom, setShowZoom] = useState(true)

  const handleSelect = id => {
    console.log('onSelect', id)
    setSelectedId(id)
  }

  const handleSelectFromList = id => {
    handleSelect(id)
    setBounds({
      prevBounds: List(boundsRef.current),
      nextBounds: index.get(id.toString()).get('bounds'),
    })
    setShowZoom(false)
  }

  const handleZoomTo = () => {
    setBounds({
      prevBounds: List(boundsRef.current),
      nextBounds: index.get(selectedId.toString()).get('bounds'),
    })
  }

  const handleBack = () => {
    setSelectedId(null)
    setBounds({ nextBounds: List(prevBounds), prevBounds: List() })
    setShowZoom(true)
  }

  const handleBoundsChange = bounds => {
    boundsRef.current = bounds
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
                showZoom={showZoom}
                onBack={handleBack}
                onZoomTo={handleZoomTo}
              />
            ) : (
              <>
                <SidebarHeader title="Explore Estuaries" icon="binoculars" />
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
            bounds={nextBounds}
            selectedFeature={selectedId}
            onSelectFeature={handleSelect}
            onBoundsChange={handleBoundsChange}
          />
        </Wrapper>
      </Layout>
    </CrossfilterProvider>
  )
}

export default Explore

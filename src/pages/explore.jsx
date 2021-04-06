import React, { useState } from 'react'
import { List } from 'immutable'
import { Flex } from 'theme-ui'

import { useData } from 'components/Data'
import {
  Provider as CrossfilterProvider,
  FilteredMap,
} from 'components/Crossfilter'
import Layout from 'components/Layout'

import Sidebar, { SidebarHeader } from 'components/Sidebar'
import ExpandableParagraph from 'components/elements/ExpandableParagraph'
import EstuariesList from 'components/EstuariesList'
import EstuaryDetails from 'components/EstuaryDetails'
import { PNWBounds } from '../../config/constants'
import { filters } from '../../config/filters'

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
      <Layout title="Explore">
        <Flex sx={{ height: '100%' }}>
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
                <ExpandableParagraph
                  snippet="Click on an estuary in the list below or in the map for more
                  detailed information..."
                  sx={{
                    fontSize: '0.8rem',
                    m: '0 1rem 1rem',
                    color: 'grey.700',
                  }}
                >
                  Click on an estuary in the list below or in the map for more
                  detailed information. Estuary boundaries will show on the map
                  when you have zoomed far enough in. This list only shows
                  estuaries visible in the map.
                </ExpandableParagraph>
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
        </Flex>
      </Layout>
    </CrossfilterProvider>
  )
}

export default Explore

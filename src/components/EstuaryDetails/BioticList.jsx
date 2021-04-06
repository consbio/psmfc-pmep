import React from 'react'
import PropTypes from 'prop-types'
import { Text, Box } from 'theme-ui'

import { OutboundLink } from 'components/Link'
import { formatNumber } from 'util/format'
import BioticListItem from './BioticListItem'

const BioticList = ({ biotic }) => {
  // convert to array: [{type: <type>, acres: <acres>}...]
  const entries = Object.entries(biotic).map(([type, acres]) => ({
    type,
    acres,
  }))

  // sort by decreasing size
  entries.sort((a, b) => (a.acres < b.acres ? 1 : -1))

  const totalAcres = Object.values(biotic).reduce(
    (sum, acres) => sum + acres,
    0
  )
  const maxAcres = Math.max(...Object.values(biotic))

  if (entries.length === 0 || totalAcres === 0) {
    return (
      <Text variant="help">
        No biotic habitats have been mapped for this estuary.
      </Text>
    )
  }

  return (
    <>
      <Text sx={{ color: 'grey.900' }}>
        There are <b>{entries.length}</b> biotic habitats mapped in this
        estuary, occupying a total of <b>{formatNumber(totalAcres)}</b> acres.
        Click the name below for more information.
      </Text>

      <Box sx={{ mt: '1rem' }}>
        {entries.map((entry) => (
          <BioticListItem key={entry.type} maxAcres={maxAcres} {...entry} />
        ))}
      </Box>

      <Box variant="layout.block">
        <Text variant="help">
          These habitats represent the Biotic Component (BC) of the{' '}
          <OutboundLink to="https://iocm.noaa.gov/cmecs/">
            Coastal and Marine Ecological Classification Standard
          </OutboundLink>{' '}
          (CMECS) for estuaries of the West Coast of the contiguous United
          States.
          <br />
          <br />
          These habitats were derived using information from the National
          Wetlands Inventory (NWI), NOAA’s Coastal Change Analysis Program
          (C-CAP), and Oregon Coastal Management Program.
          <br />
          <br />
          For more information and data access,{' '}
          <OutboundLink to="http://www.pacificfishhabitat.org/data/estuarine-biotic-habitat">
            click here
          </OutboundLink>
          .
        </Text>
      </Box>
    </>
  )
}

BioticList.propTypes = {
  biotic: PropTypes.objectOf(PropTypes.number).isRequired,
}

export default BioticList

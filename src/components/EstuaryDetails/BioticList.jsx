import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import styled, { themeGet } from 'util/style'
import { formatNumber } from 'util/format'
import BioticListItem from './BioticListItem'

const Header = styled(HelpText)`
  margin-bottom: 2rem;
`

const Section = styled.section`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${themeGet('colors.grey.200')};
`

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
      <HelpText>No biotic habitats have been mapped for this estuary.</HelpText>
    )
  }

  return (
    <>
      <Header>
        There are <b>{entries.length}</b> biotic habitats mapped in this
        estuary, occupying a total of <b>{formatNumber(totalAcres)}</b> acres.
        Click the name below for more information.
      </Header>

      {entries.map(entry => (
        <BioticListItem key={entry.type} maxAcres={maxAcres} {...entry} />
      ))}
      <Section>
        <HelpText>
          These habitats represent the Biotic Component (BC) of the{' '}
          <OutboundLink
            from="/"
            to="https://iocm.noaa.gov/cmecs/"
            target="_blank"
          >
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
          <OutboundLink
            from="/"
            to="http://www.pacificfishhabitat.org/data/estuarine-biotic-habitat"
            target="_blank"
          >
            click here
          </OutboundLink>
          .
        </HelpText>
      </Section>
    </>
  )
}

BioticList.propTypes = {
  biotic: PropTypes.objectOf(PropTypes.number).isRequired,
}

export default BioticList

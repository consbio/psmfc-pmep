import React from 'react'
import PropTypes from 'prop-types'

import { Flex } from 'components/Grid'
import styled, { themeGet } from 'util/style'
import { formatNumber } from 'util/format'
import BioticListItem from './BioticListItem'

const Total = styled.div`
  text-align: right;
  color: ${themeGet('colors.grey.600')};
  font-size: 0.9rem;
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

  return (
    <>
      <Flex alignItems="baseline" justifyContent="space-between">
        <Total>{formatNumber(totalAcres)} acres total</Total>
      </Flex>
      {entries.map(entry => (
        <BioticListItem key={entry.type} maxAcres={maxAcres} {...entry} />
      ))}
    </>
  )
}

BioticList.propTypes = {
  biotic: PropTypes.objectOf(PropTypes.number).isRequired,
}

export default BioticList

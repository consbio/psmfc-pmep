import React from 'react'
import PropTypes from 'prop-types'

import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import Donut from 'components/Donut'
import { formatNumber } from 'util/format'
import styled from 'util/style'

const Wrapper = styled(Flex)``
const StyledDonut = styled(Donut)`
  flex: 0 0 auto;
  margin: 0 1rem 1rem 0;
`

const TidalWetlandLoss = ({ area, lost }) => {
  if (!area) {
    return (
      <HelpText>Tidal wetland loss was not assessed for this estuary.</HelpText>
    )
  }

  const percent = Math.min(100, (100 * lost) / area)

  return (
    <Wrapper>
      <StyledDonut
        percent={percent}
        percentLabel={formatNumber(percent, 0)}
        label="area lost"
        size={100}
        donutWidth={10}
      />
      <HelpText>
        Tidal wetlands have been lost on approximately {formatNumber(lost, 0)}{' '}
        acres of the {formatNumber(area, 0)} acres of estimated historical tidal
        wetlands.
      </HelpText>
    </Wrapper>
  )
}

TidalWetlandLoss.propTypes = {
  area: PropTypes.number,
  lost: PropTypes.number,
}

TidalWetlandLoss.defaultProps = {
  area: null,
  lost: null,
}

export default TidalWetlandLoss

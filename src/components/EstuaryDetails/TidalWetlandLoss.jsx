import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import { MultiValueDonut } from 'components/Donut'
import { formatNumber } from 'util/format'
import styled from 'util/style'
import { twInfo } from '../../../config/constants'

const Section = styled(Flex).attrs({ alignItems: 'center', mt: '1rem' })``
const StyledDonut = styled(MultiValueDonut)`
  flex: 0 0 auto;
  margin-right: 1rem;
`

const Note = styled(HelpText).attrs({ fontSize: '0.8rem' })``

const Patch = styled.div`
  width: 1rem;
  height: 1rem;
  background: ${({ color }) => color};
  margin-right: 0.5rem;
`

const Legend = styled(Flex).attrs({ alignItems: 'center' })`
  &:not(:first-child) {
    margin-top: 0.25rem;
  }
`

// add a bit of transparency to mute colors, and transform to a simpler object
const colors = Object.assign(
  {},
  ...Object.entries(twInfo).map(([key, { color }]) => ({ [key]: `${color}99` }))
)

const TidalWetlandLoss = ({ area, lost, restored }) => {
  if (!area) {
    return (
      <HelpText>Tidal wetland loss was not assessed for this estuary.</HelpText>
    )
  }

  const retained = area - lost - restored
  const percentLost = Math.min(100, (100 * lost) / area)
  const percentRestored = Math.min(100, (100 * restored) / area)
  const percentRetained = Math.max(0, (100 * retained) / area)

  const donutEntries = [
    {
      percent: percentLost,
      color: colors.lost,
    },
    {
      percent: percentRestored,
      color: colors.restored,
    },
    {
      percent: percentRetained,
      color: colors.retained,
    },
  ]

  return (
    <>
      <HelpText>
        Tidal vegetated wetlands historically occupied approximately{' '}
        {formatNumber(area, 0)} acres.
      </HelpText>

      {/* Experimental, pending review */}
      <Section>
        <StyledDonut entries={donutEntries} size={100} donutWidth={20} />

        <div>
          <Legend>
            <Patch color={colors.lost} />
            <HelpText>
              <b>{formatNumber(lost, 0)}</b> acres (
              {formatNumber(percentLost, 0)}%) lost
            </HelpText>
          </Legend>

          {percentRestored > 0 ? (
            <Legend>
              <Patch color={colors.restored} />
              <HelpText>
                <b>{formatNumber(restored, 0)}</b> acres (
                {formatNumber(percentRestored, 0)}%) restored
              </HelpText>
            </Legend>
          ) : null}

          <Legend>
            <Patch color={colors.retained} />
            <HelpText>
              <b>{formatNumber(retained, 0)}</b> acres (
              {formatNumber(percentRetained, 0)}%) retained
            </HelpText>
          </Legend>
        </div>
      </Section>

      <Note my="1rem">
        Tidal vegetated wetland loss was assessed by comparing the current
        extent of tidal wetlands in the{' '}
        <OutboundLink from="/" to="https://www.fws.gov/wetlands/">
          National Wetland Inventory
        </OutboundLink>{' '}
        (NWI) to the historical estuary extent shown in this tool (open water
        areas were excluded from the analysis). This approach worked best for
        larger estuaries. Changes in estuary topography due to fill, outdated
        information from the NWI, and incomplete information on restored tidal
        wetlands may result in errors in these estimates of tidal wetland loss.{' '}
        <OutboundLink
          from="/"
          to="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0218558"
        >
          Read more...
        </OutboundLink>
      </Note>
    </>
  )
}

TidalWetlandLoss.propTypes = {
  area: PropTypes.number,
  lost: PropTypes.number,
  restored: PropTypes.number,
}

TidalWetlandLoss.defaultProps = {
  area: 0,
  lost: 0,
  restored: PropTypes.number,
}

export default TidalWetlandLoss

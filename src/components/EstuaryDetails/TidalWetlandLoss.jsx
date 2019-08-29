import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import Donut from 'components/Donut'
import { formatNumber } from 'util/format'
import styled, { theme } from 'util/style'
import { twColors } from '../../../config/constants'

const Section = styled(Flex).attrs({ alignItems: 'center', mt: '1rem' })``
const StyledDonut = styled(Donut)`
  flex: 0 0 auto;
  margin-right: 1rem;
`

const Note = styled(HelpText).attrs({ fontSize: '0.8rem' })``

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

  return (
    <>
      <HelpText>
        Tidal vegetated wetlands historically occupied approximately{' '}
        {formatNumber(area, 0)} acres.
      </HelpText>

      <Section>
        <StyledDonut
          percent={percentLost}
          percentLabel={formatNumber(percentLost, 0)}
          color={twColors.lost}
          label="lost"
          size={100}
          donutWidth={10}
        />
        <HelpText>
          These wetlands have been lost on approximately{' '}
          <b>{formatNumber(lost, 0)}</b> acres.
        </HelpText>
      </Section>

      {restored > 0 ? (
        <Section>
          <StyledDonut
            percent={percentRestored}
            percentLabel={formatNumber(percentRestored, 0)}
            color={`${twColors.restored}`}
            offset={percentLost}
            label="restored"
            size={100}
            donutWidth={10}
          />
          <HelpText>
            These wetlands have been restored on approximately{' '}
            <b>{formatNumber(restored, 0)}</b> acres.
          </HelpText>
        </Section>
      ) : null}

      {retained > 0 ? (
        <Section>
          <StyledDonut
            percent={percentRetained}
            percentLabel={formatNumber(percentRetained, 0)}
            color={`${twColors.retained}66`}
            offset={percentLost + percentRestored}
            label="retained"
            size={100}
            donutWidth={10}
          />
          <HelpText>
            These wetlands have been retained (not lost or restored) on
            approximately <b>{formatNumber(retained, 0)}</b> acres.
          </HelpText>
        </Section>
      ) : null}

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

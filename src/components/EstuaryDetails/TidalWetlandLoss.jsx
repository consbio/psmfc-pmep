import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import { Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import Donut from 'components/Donut'
import { formatNumber } from 'util/format'
import styled, { theme } from 'util/style'

const Section = styled(Flex).attrs({ mt: '1rem' })``
const StyledDonut = styled(Donut)`
  flex: 0 0 auto;
  margin: 0 1rem 1rem 0;
`

const Note = styled(HelpText).attrs({ fontSize: '0.8rem' })``

const TidalWetlandLoss = ({ area, lost, restored }) => {
  if (!area) {
    return (
      <HelpText>Tidal wetland loss was not assessed for this estuary.</HelpText>
    )
  }

  const percentLost = Math.min(100, (100 * lost) / area)
  const percentRestored = Math.min(100, (100 * restored) / area)

  return (
    <>
      <Section>
        <StyledDonut
          percent={percentLost}
          color={theme.colors.secondary[300]}
          percentLabel={formatNumber(percentLost, 0)}
          label="lost"
          size={100}
          donutWidth={10}
        />
        <HelpText>
          Tidal vegetated wetlands have been lost on approximately{' '}
          <b>{formatNumber(lost, 0)}</b> acres of the{' '}
          <b>{formatNumber(area, 0)}</b> acres of their estimated historical
          extent.
        </HelpText>
      </Section>

      {restored && (
        <Section>
          <StyledDonut
            percent={percentRestored}
            percentLabel={formatNumber(percentRestored, 0)}
            label="restored"
            size={100}
            donutWidth={10}
          />
          <HelpText>
            Tidal vegetated wetlands have been restored on approximately{' '}
            <b>{formatNumber(restored, 0)}</b> acres.
          </HelpText>
        </Section>
      )}

      <Note mb="1rem">
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
  area: null,
  lost: null,
  restored: PropTypes.number,
}

export default TidalWetlandLoss

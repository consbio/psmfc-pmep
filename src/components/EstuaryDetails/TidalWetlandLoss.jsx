import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'theme-ui'

import { OutboundLink } from 'components/Link'
import { MultiValueDonut, Legend } from 'components/Donut'
import { formatNumber } from 'util/format'
import { twInfo } from '../../../config/constants'

// add a bit of transparency to mute colors, and transform to a simpler object
const colors = Object.assign(
  {},
  ...Object.entries(twInfo).map(([key, { color }]) => ({ [key]: `${color}99` }))
)

const TidalWetlandLoss = ({ area, lost, restored }) => {
  if (!area) {
    return (
      <Text variant="help">
        Tidal wetland loss was not assessed for this estuary.
      </Text>
    )
  }

  const retained = area - lost - restored
  const percentLost = Math.min(100, (100 * lost) / area)
  const percentRestored = Math.min(100, (100 * restored) / area)
  const percentRetained = Math.max(0, (100 * retained) / area)

  // TODO: build this up based on which ones are > 0
  const donutEntries = []

  if (percentLost > 0) {
    donutEntries.push({
      id: 'lost',
      percent: percentLost,
      color: colors.lost,
      label: (
        <>
          <b>{formatNumber(lost, 0)}</b> acres ({formatNumber(percentLost, 0)}%)
          lost
        </>
      ),
    })
  }
  if (percentRestored) {
    donutEntries.push({
      id: 'restored',
      percent: percentRestored,
      color: colors.restored,
      label: (
        <>
          <b>{formatNumber(restored, 0)}</b> acres (
          {formatNumber(percentRestored, 0)}%) restored
        </>
      ),
    })
  }
  if (percentRetained) {
    donutEntries.push({
      id: 'retained',
      percent: percentRetained,
      color: colors.retained,
      label: (
        <>
          <b>{formatNumber(retained, 0)}</b> acres (
          {formatNumber(percentRetained, 0)}%) retained
        </>
      ),
    })
  }

  return (
    <>
      <Text sx={{ color: 'grey.900' }}>
        Vegetated tidal wetlands historically occupied approximately{' '}
        <b>{formatNumber(area, 0)}</b> acres.
      </Text>

      <Flex sx={{ alignItems: 'center', mt: '1rem' }}>
        <Box sx={{ mr: '1rem', flex: '0 0 auto' }}>
          <MultiValueDonut entries={donutEntries} size={100} donutWidth={20} />
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Legend entries={donutEntries} />
        </Box>
      </Flex>

      <Text variant="help" sx={{ my: '1rem' }}>
        Vegetated tidal wetland loss was assessed by comparing the current
        extent of tidal wetlands in the{' '}
        <OutboundLink to="https://www.fws.gov/wetlands/">
          National Wetland Inventory
        </OutboundLink>{' '}
        (NWI) to the historical estuary extent shown in this tool (open water
        and aquatic vegetated areas were excluded from the analysis). This
        approach worked best for larger estuaries. Changes in estuary topography
        due to fill, outdated information from the NWI, and incomplete
        information on restored tidal wetlands may result in errors in these
        estimates of tidal wetland loss.{' '}
        <OutboundLink to="http://www.pacificfishhabitat.org/data/tidal-wetlands-loss-assessment">
          Read more...
        </OutboundLink>
      </Text>
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

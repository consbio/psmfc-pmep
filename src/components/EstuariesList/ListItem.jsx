import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex } from 'theme-ui'
import { darken } from '@theme-ui/color'

import { formatNumber } from 'util/format'
import { stateNames, estuaryTypes } from '../../../config/constants'

const ListItem = ({ name, type, state, acres, ...props }) => (
  <Box
    sx={{
      fontSize: ['0.9rem', '0.8rem', '0.9rem'],
      lineHeight: 1.2,
      py: '0.5rem',
      px: '1rem',
      cursor: 'pointer',
      color: 'grey.600',
      '&:not(:first-of-type)': {
        pt: '0.5rem',
        borderTop: '1px solid',
        borderTopColor: 'grey.100',
      },
      '&:hover': {
        bg: darken('grey.100', 0.005),
      },
    }}
    {...props}
  >
    <Flex
      sx={{
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Text sx={{ color: 'link', fontSize: '1rem' }}>{name}</Text>
        {stateNames[state] || ''}
      </Box>
      <Box sx={{ textAlign: 'right', fontSize: 'smaller' }}>
        {estuaryTypes[type].label}
        <br />({formatNumber(acres, 0)} acres)
      </Box>
    </Flex>
  </Box>
)

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
}

// only rerender on ID change
export default memo(
  ListItem,
  ({ id: prevID }, { id: nextID }) => nextID === prevID
)

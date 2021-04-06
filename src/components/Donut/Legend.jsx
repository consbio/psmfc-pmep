import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'theme-ui'

const Legend = ({ entries }) => (
  <Box>
    {entries.map(({ id, color, label }) => (
      <Flex
        key={id}
        sx={{
          alignItems: 'center',
          '&:not(:first-of-type)': {
            mt: '0.25rem',
          },
        }}
      >
        <Box
          sx={{
            flex: '0 0 auto',
            width: '1rem',
            height: '1rem',
            bg: color,
            mr: '0.5rem',
          }}
        />
        <Text variant="help" sx={{ flex: '1 1 auto' }}>
          {label}
        </Text>
      </Flex>
    ))}
  </Box>
)

Legend.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string,
      ]).isRequired,
    })
  ).isRequired,
}

export default Legend

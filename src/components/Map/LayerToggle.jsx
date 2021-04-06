import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from 'theme-ui'

import { ToggleButton } from 'components/Button'

const LayerToggle = ({ value, options, onChange }) => (
  <Flex
    sx={{
      alignItems: 'center',
      p: '0.5rem',
      position: 'absolute',
      top: 0,
      left: '10px',
      zIndex: 1000,
      bg: '#FFF',
      borderRadius: '0 0 0.25rem 0.25rem',
      boxShadow: '1px 1px 8px #333',
    }}
  >
    <Text sx={{ mr: '0.5rem' }}>Show:</Text>
    <ToggleButton
      value={value}
      options={options}
      onChange={onChange}
      sx={{
        fontSize: '0.9rem',
        textTransform: 'lowercase',
      }}
    />
  </Flex>
)

LayerToggle.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default LayerToggle

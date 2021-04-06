import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'theme-ui'

const SortBar = ({ index, options, onChange }) => (
  <Box sx={{ color: 'grey.600', fontSize: '0.8rem', lineHeight: 1.2 }}>
    sort:
    {options.map(({ label }, idx) => (
      <Text
        as="span"
        key={label}
        onClick={() => onChange(idx)}
        sx={{
          cursor: 'pointer',
          display: 'inline-block',
          fontWeight: 'bold',
          ml: '0.5em',
          color: idx === index ? 'highlight.500' : 'inherit',
          '&:not(:first-of-type)': {
            pl: '0.5em',
            borderLeft: '1px solid',
            borderLeftColor: 'grey.400',
          },
        }}
      >
        {label}
      </Text>
    ))}
  </Box>
)

SortBar.propTypes = {
  index: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}

// only rerender on index change
export default memo(
  SortBar,
  ({ index: prevIndex }, { index: nextIndex }) => prevIndex === nextIndex
)

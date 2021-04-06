import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from 'theme-ui'

const buttonGroupCSS = {
  button: {
    py: '0.25rem',
    px: '0.5rem',
    '&:first-of-type': {
      borderRadius: '6px 0 0 6px',
    },
    '&:last-of-type': {
      borderRadius: '0 6px 6px 0',
    },
    '&:not(:first-of-type):not(:last-of-type)': {
      borderRadius: 0,
    },
    '& + button': {
      borderLeft: '1px solid #FFF',
    },
  },
}

const ToggleButton = ({ value, options, onChange, sx }) => {
  const handleClick = (newValue) => {
    if (newValue === value) return

    onChange(newValue)
  }

  if (value === null)
    return (
      <Box sx={{ ...buttonGroupCSS, ...sx }}>
        {options.map(({ value: v, label }) => (
          <Button
            key={v}
            sx={{
              flex: '1 1 auto',
              color: 'grey.900',
              bg: 'primary.100',
              outline: 'none',
            }}
            onClick={() => handleClick(v)}
          >
            {label}
          </Button>
        ))}
      </Box>
    )

  return (
    <Box sx={{ ...buttonGroupCSS, ...sx }}>
      {options.map(({ value: v, label }) =>
        v === value ? (
          <Button
            key={v}
            variant="primary"
            sx={{ flex: '1 1 auto', outline: 'none' }}
          >
            {label}
          </Button>
        ) : (
          <Button
            key={v}
            sx={{
              flex: '1 1 auto',
              color: 'grey.900',
              bg: 'primary.100',
              outline: 'none',
            }}
            onClick={() => handleClick(v)}
          >
            {label}
          </Button>
        )
      )}
    </Box>
  )
}

ToggleButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  sx: PropTypes.object,
}

ToggleButton.defaultProps = {
  value: null,
  sx: {},
}

export default memo(
  ToggleButton,
  ({ value: prevValue }, { value: nextValue }) => prevValue === nextValue
)

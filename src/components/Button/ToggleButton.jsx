import React, { memo } from 'react'
import PropTypes from 'prop-types'

import styled, { themeGet } from 'util/style'
import { DefaultButton, PrimaryButton } from './Button'
import ButtonGroup from './ButtonGroup'

const Button = styled(PrimaryButton)`
  flex: 1 1 auto;
`

const InactiveButton = styled(DefaultButton)`
  background-color: ${themeGet('colors.primary.100')};
  color: ${themeGet('colors.grey.900')};
  flex: 1 1 auto;
`

const ToggleButton = ({ value, options, onChange, ...props }) => {
  const handleClick = newValue => {
    if (newValue === value) return

    onChange(newValue)
  }

  if (value === null)
    return (
      <ButtonGroup {...props}>
        {options.map(({ value: v, label }) => (
          <InactiveButton key={v} onClick={() => handleClick(v)}>
            {label}
          </InactiveButton>
        ))}
      </ButtonGroup>
    )

  return (
    <ButtonGroup {...props}>
      {options.map(({ value: v, label }) =>
        v === value ? (
          <Button key={v}>{label}</Button>
        ) : (
          <InactiveButton key={v} onClick={() => handleClick(v)}>
            {label}
          </InactiveButton>
        )
      )}
    </ButtonGroup>
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
}

ToggleButton.defaultProps = {
  value: null,
}

export default memo(
  ToggleButton,
  ({ value: prevValue }, { value: nextValue }) => prevValue === nextValue
)

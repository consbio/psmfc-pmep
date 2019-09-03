import React from 'react'
import PropTypes from 'prop-types'
import { Button as BaseButton } from 'rebass'

import styled from 'util/style'

export const DefaultButton = styled(BaseButton).attrs({
  variant: 'default',
})`
  opacity: 1;
  transition: opacity 0.25s linear;
  border-radius: 0.25em;
  font-weight: normal;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3 !important;
    cursor: not-allowed;
  }
`

export const PrimaryButton = styled(DefaultButton).attrs({
  variant: 'primary',
})``

export const SecondaryButton = styled(DefaultButton).attrs({
  variant: 'secondary',
})``

export const WarningButton = styled(DefaultButton).attrs({
  variant: 'warning',
})``

export const Button = ({
  children,
  primary,
  secondary,
  disabled,
  warning,
  onClick,
  ...props
}) => {
  let StyledButton = null
  if (primary) {
    StyledButton = PrimaryButton
  } else if (secondary) {
    StyledButton = SecondaryButton
  } else if (warning) {
    StyledButton = WarningButton
  } else {
    StyledButton = DefaultButton
  }

  return (
    <StyledButton disabled={disabled} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  warning: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  disabled: false,
  warning: false,
  onClick: () => {},
}

export default Button

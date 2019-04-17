import React from 'react'
import PropTypes from 'prop-types'
import { Button as BaseButton } from 'rebass'

import { Flex } from 'components/Grid'
import styled from 'util/style'

export const DefaultButton = styled(BaseButton).attrs({
  variant: 'default',
  borderRadius: 8,
})`
  opacity: 1;
  transition: opacity 0.25s linear;

  &:hover {
    opacity: 0.8;
  }
`

export const PrimaryButton = styled(DefaultButton).attrs({
  variant: 'primary',
})``

export const SecondaryButton = styled(DefaultButton).attrs({
  variant: 'secondary',
})``

export const DisabledButton = styled(DefaultButton).attrs({
  variant: 'disabled',
  disabled: true,
})`
  cursor: default;
  &:hover {
    opacity: inherit;
  }
`


export const Button = ({ children, primary, secondary, disabled, onClick }) => {
  let StyledButton = null
  if (primary) {
    StyledButton = PrimaryButton
  } else if (secondary) {
    StyledButton = SecondaryButton
  } else if (disabled) {
    StyledButton = DisabledButton
  } else {
    StyledButton = DefaultButton
  }

  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  primary: false,
  secondary: false,
  disabled: false,
  onClick: () => {},
}

export const ButtonGroup = styled(Flex).attrs({ alignItems: 'center' })`
  button:first-child {
    border-radius: 6px 0 0 6px;
  }
  button:last-child {
    border-radius: 0 6px 6px 0;
  }
  button:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
  button + button {
    border-left: 1px solid #fff;
  }
`

export default Button

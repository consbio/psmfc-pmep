import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'

const buttonCSS = {
  cursor: 'pointer',
  textAlign: 'center',
  flex: '1 1 auto',
  py: '0.25rem',
  px: '0.5rem',
  color: 'grey.700',
  borderBottom: '1px solid',
  borderBottomColor: 'grey.200',
  '&:hover': {
    bg: 'grey.200',
  },
}

const activeButtonCSS = {
  ...buttonCSS,
  fontWeight: 'bold',
  color: 'grey.900',
  borderBottomColor: 'transparent',
  bg: '#FFF',
  '&:not(:first-of-type)': {
    borderLeft: '1px solid',
    borderLeftColor: 'grey.200',
  },
  '&:not(:last-of-type)': {
    borderRight: '1px solid',
    borderRightColor: 'grey.200',
  },
}

const Button = ({ id, label, active, onClick }) => {
  const handleClick = () => {
    onClick(id)
  }
  return active ? (
    <Box sx={activeButtonCSS}>{label}</Box>
  ) : (
    <Box sx={buttonCSS} onClick={handleClick}>
      {label}
    </Box>
  )
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  active: false,
}

export default memo(
  Button,
  ({ id: prevId, active: prevActive }, { id: nextId, active: nextActive }) =>
    prevId === nextId && prevActive === nextActive
)

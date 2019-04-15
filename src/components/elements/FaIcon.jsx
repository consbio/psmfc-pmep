import React from 'react'
import PropTypes from 'prop-types'

const FaIcon = ({ name, size, ...props }) => {
  const iconName = `Fa${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
  const Icon = require('react-icons/fa')[iconName]

  if (!Icon) return null

  return <Icon size={size} {...props} />
}

FaIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
}

FaIcon.defaultProps = {
  size: null,
}

export default FaIcon

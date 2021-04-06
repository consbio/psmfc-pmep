import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'theme-ui'

// TODO: remove and just use variant directly
const HelpText = ({ children }) => <Text variant="help">{children}</Text>

HelpText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default HelpText

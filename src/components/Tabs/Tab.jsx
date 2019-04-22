import React from 'react'
import PropTypes from 'prop-types'

const Tab = ({ id, children, ...props }) => <div {...props}>{children}</div>

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
}

export default Tab

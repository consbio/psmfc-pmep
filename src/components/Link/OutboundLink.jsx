import React from 'react'
import PropTypes from 'prop-types'
import { OutboundLink as Link } from 'gatsby-plugin-google-gtag'


const OutboundLink = ({ to, target, rel, children, ...props }) => (
  <Link href={to} target={target} rel={rel} {...props}>
    {children}
  </Link>
)

OutboundLink.propTypes = {
  to: PropTypes.string.isRequired,
  target: PropTypes.string,
  rel: PropTypes.string,
  children: PropTypes.any.isRequired,
}

OutboundLink.defaultProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

export default OutboundLink

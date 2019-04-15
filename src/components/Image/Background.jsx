import React from 'react'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'

import Credits from './Credits'

const Background = ({ fluid, children, credits, ...props }) => (
  <BackgroundImage fluid={fluid} {...props}>
    {children}

    {credits && <Credits author={credits.author} url={credits.url} />}
  </BackgroundImage>
)

Background.propTypes = {
  fluid: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  credits: PropTypes.shape({
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
  }),
}

Background.defaultProps = {
  credits: null,
}

export default Background

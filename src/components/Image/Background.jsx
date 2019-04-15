import React from 'react'
import PropTypes from 'prop-types'
import BackgroundImage from 'gatsby-background-image'

import Credits from './Credits'

const Background = ({ fluid, children, credits, ...props }) => (
  <BackgroundImage fluid={fluid} {...props}>
    {children}

    {credits && (
      <Credits
        author="stokes rx"
        url="https://www.flickr.com/photos/stokesrx/6307999051"
      />
    )}
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

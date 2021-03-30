import React from 'react'
import PropTypes from 'prop-types'
import { getImage } from 'gatsby-plugin-image'
import { BgImage as BackgroundImage } from 'gbimage-bridge'

import Credits from './Credits'

const Background = ({ image, children, credits, ...props }) => (
  <BackgroundImage image={getImage(image)} {...props} preserveStackingContext>
    {children}

    {credits && <Credits author={credits.author} url={credits.url} />}
  </BackgroundImage>
)

Background.propTypes = {
  image: PropTypes.object.isRequired,
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

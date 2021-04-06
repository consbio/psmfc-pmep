import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'

import { OutboundLink } from 'components/Link'

const Credits = ({ author, url }) => (
  <Box
    sx={{
      fontSize: 'smaller',
      textAlign: 'right',
      position: 'absolute',
      bottom: 0,
      right: 0,
      color: '#FFF',
      py: '0.25rem',
      px: '1rem',
      textShadow: '1px 1px 3px #000',
      bg: 'rgba(0, 0, 0, 0.4)',
      a: {
        color: '#FFF',
      },
    }}
  >
    Photo:&nbsp;
    {url ? <OutboundLink to={url}>{author}</OutboundLink> : author}
  </Box>
)

Credits.propTypes = {
  author: PropTypes.string.isRequired,
  url: PropTypes.string,
}

Credits.defaultProps = {
  url: null,
}

export default Credits

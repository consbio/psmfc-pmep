import React from 'react'
import PropTypes from 'prop-types'

import { OutboundLink } from 'components/Link'
import styled, { themeGet } from 'util/style'

const Wrapper = styled.div`
  font-size: smaller;
  text-align: right;
  margin-right: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;
  color: ${themeGet('colors.white')};
  padding: 0.25rem 0.5rem;
  text-shadow: 1px 1px 3px ${themeGet('colors.black')};

  a {
    color: ${themeGet('colors.white')};
    text-decoration: none;
  }
`

const Credits = ({ author, url }) => (
  <Wrapper>
    Photo:&nbsp;
    {url ? (
      <OutboundLink from="/" to={url} target="_blank" rel="noopener noreferrer">
        {author}
      </OutboundLink>
    ) : (
      author
    )}
  </Wrapper>
)

Credits.propTypes = {
  author: PropTypes.string.isRequired,
  url: PropTypes.string,
}

Credits.defaultProps = {
  url: null,
}

export default Credits

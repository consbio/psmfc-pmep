import React from 'react'

import styled, { themeGet } from 'util/style'

import { Flex } from 'components/Grid'
import { OutboundLink } from 'components/Link'

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  flex: 0;
  background-color: ${themeGet('colors.primary.900')};
  padding: 0.25em 1em;
  font-size: 0.7rem;
  color: #fff;

  a {
    color: #fff;
  }
`

const Footer = () => (
  <Wrapper as="footer">
    <div>
      Partners:{' '}
      <OutboundLink
        from="/"
        to="http://www.northpacificlcc.org/"
        target="_blank"
      >
        NPLCC
      </OutboundLink>{' '}
      and{' '}
      <OutboundLink
        from="/"
        to="http://www.pacificfishhabitat.org/"
        target="_blank"
      >
        PMEP
      </OutboundLink>
      &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <OutboundLink
        from="/"
        to="http://www.pacificfishhabitat.org/data/"
        target="_blank"
      >
        Access data
      </OutboundLink>
    </div>
    <div>
      Created by the{' '}
      <OutboundLink from="/" to="https://consbio.org" target="_blank">
        Conservation Biology Institute
      </OutboundLink>
    </div>
  </Wrapper>
)

export default Footer

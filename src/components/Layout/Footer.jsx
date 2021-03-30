import React from 'react'
import { Flex, Box } from 'theme-ui'
// import styled, { themeGet } from 'util/style'

// import { Flex } from 'components/Grid'
import { OutboundLink } from 'components/Link'

// const Wrapper = styled(Flex).attrs({
//   alignItems: 'center',
//   justifyContent: 'space-between',
// })`
//   flex: 0;
//   background-color: ${themeGet('colors.primary.900')};
//   padding: 0.25em 1em;
//   font-size: 0.7rem;
//   color: #fff;

//   a {
//     color: #fff;
//   }
// `

const Footer = () => (
  <Flex
    as="footer"
    sx={{
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: '0 0 auto',
      bg: 'primary.900',
      py: '0.25em',
      px: '1em',
      color: '#FFF',
      a: {
        color: '#FFF',
      },
    }}
  >
    <Box>
      Partners: NPLCC and{' '}
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
    </Box>
    <Box>
      Created by the{' '}
      <OutboundLink from="/" to="https://consbio.org" target="_blank">
        Conservation Biology Institute
      </OutboundLink>
    </Box>
  </Flex>
)

export default Footer

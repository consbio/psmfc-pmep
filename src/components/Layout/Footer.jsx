import React from 'react'
import { Flex, Box } from 'theme-ui'

import { OutboundLink } from 'components/Link'

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
      fontSize: '0.7rem',
      color: '#FFF',
      a: {
        color: '#FFF',
      },
    }}
  >
    <Box>
      Partners: NPLCC and{' '}
      <OutboundLink to="http://www.pacificfishhabitat.org/">PMEP</OutboundLink>
      &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <OutboundLink to="http://www.pacificfishhabitat.org/data/">
        Access data
      </OutboundLink>
    </Box>
    <Box>
      Created by the{' '}
      <OutboundLink to="https://consbio.org">
        Conservation Biology Institute
      </OutboundLink>
    </Box>
  </Flex>
)

export default Footer

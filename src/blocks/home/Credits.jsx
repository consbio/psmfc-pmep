import React from 'react'
import { Box, Grid, Container, Image } from 'theme-ui'

import { OutboundLink } from 'components/Link'

import Logo from 'images/cbi_logo.png'

const CBI = () => (
  <Container
    variant="section"
    sx={{ borderTop: '0.5rem solid', borderTopColor: 'primary.500' }}
  >
    <Grid columns={[0, '2fr 1fr']} gap={5}>
      <Box as="p" sx={{ fontSize: [1, 2] }}>
        This application was created by the&nbsp;
        <OutboundLink to="https://consbio.org">
          Conservation Biology Institute
        </OutboundLink>
        &nbsp; (CBI) in partnership with the&nbsp;
        <OutboundLink to="http://www.pacificfishhabitat.org/">
          Pacific Marine & Estuarine Fish Habitat Partnership
        </OutboundLink>
        &nbsp;and with financial support from the&nbsp; North Pacific Landscape
        Conservation Cooperative and National Oceanic and Atmpospheric
        Administration -{' '}
        <OutboundLink to="https://www.fisheries.noaa.gov/about/office-habitat-conservation">
          Office of Habitat Conservation
        </OutboundLink>
        . CBI provides science and software development to support the
        conservation of biodiversity.
      </Box>

      <Image src={Logo} alt="CBI logo" />
    </Grid>
  </Container>
)

export default CBI

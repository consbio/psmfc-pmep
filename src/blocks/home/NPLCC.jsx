import React from 'react'
import { Box, Heading, Container, Image, Grid } from 'theme-ui'

import { OutboundLink } from 'components/Link'

import Logo from 'images/nplcc_logo.png'

const NPLCC = () => (
  <Container
    variant="section"
    sx={{ borderTop: '0.5rem solid', borderTopColor: 'primary.500' }}
  >
    <Heading as="h2">North Pacific Landscape Conservation Cooperative</Heading>
    <Grid columns={[0, '2fr 1fr']} gap={6}>
      <Box as="p">
        The North Pacific Landscape Conservation Cooperative (NPLCC)
        collaborated with many partners to put science to work toward more
        effective, landscape-level conservation. The NPLCC prioritized
        identification and sharing of information about natural resources
        throughout the region.
        <br />
        <br />
        To access and collaborate around geospatial data within the NPLCC
        region, please visit the&nbsp;
        <OutboundLink to="https://nplcc.databasin.org">
          NPLCC Conservation Planning Atlas
        </OutboundLink>
        .
      </Box>
      <Image src={Logo} alt="NPLCC logo" />
    </Grid>
  </Container>
)

export default NPLCC

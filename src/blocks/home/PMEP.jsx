import React from 'react'
import { Box, Grid, Container, Heading, Image } from 'theme-ui'

import { OutboundLink } from 'components/Link'

import Logo from 'images/pmep_logo.png'

const PMEP = () => (
  <Container variant="section">
    <Heading as="h2">
      Pacific Marine &amp; Estuarine Fish Habitat Partnership
    </Heading>
    <Grid columns={[0, '2fr 1fr']} gap={6}>
      <Box as="p">
        The Pacific Marine & Estuarine Fish Habitat Partnership (PMEP) works
        with partners to protect, enhance, and restore ecological processes and
        habitats within estuaries and nearshore marine environments. PMEP
        focuses on enhancing juvenile fish habitat, water quality, and water
        quantity in nearshore marine and estuary habitats, and also on
        connectivity between tidal and nearshore marine areas. These efforts
        prioritize healthy native fish communities and sustainable human uses
        that depend on them.
        <br />
        <br />
        To get involved and find out more about PMEP, available funding
        opportunities, and projects supported by PMEP, please&nbsp;
        <OutboundLink to="http://www.pacificfishhabitat.org/">
          click here
        </OutboundLink>
        .
      </Box>
      <Image src={Logo} alt="PMEP logo" />
    </Grid>
  </Container>
)

export default PMEP

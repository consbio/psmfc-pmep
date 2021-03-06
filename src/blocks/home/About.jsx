import React from 'react'
import { Box, Grid, Container, Heading, Image } from 'theme-ui'

import { Link, OutboundLink } from 'components/Link'
import CompareImg from 'images/compare.jpg'
import ExploreImg from 'images/explore.jpg'

const About = () => (
  <Container
    sx={{
      py: '3rem',
      px: '1.5rem',
    }}
  >
    <Heading as="h2" sx={{}}>
      The West Coast Estuaries Explorer
    </Heading>

    <Grid gap={4} columns={[1, 1, 2]}>
      <Box as="p">
        This application enables you to&nbsp;
        <Link to="/compare">compare</Link>&nbsp; estuaries to each other along
        the coastlines of Washington, Oregon, and California. You can combine
        dynamic filters and an interactive map to find specific estuary types
        you are interested in, such as large river delta estuaries which often
        have extensive diking; small, riverine estuaries that are at the lowest
        risk to fish habitat degradation; or estuaries contain species that
        interest you. Only want to compare estuaries in a specific area? Simply
        zoom the map in to that area, and the filters automatically update to
        show you the number of estuaries in that area that meet different
        conditions.
      </Box>
      <Image
        src={CompareImg}
        alt="Compare screenshot"
        variant="images.screenshot"
      />

      <Box as="p">
        You can also&nbsp;
        <Link to="/explore">explore</Link>
        &nbsp;estuaries in more detail to find a specific estuary by name or
        location.
        <br />
        <br />
        Click on an estuary in the map for more detailed information.
        <br />
        <br />
        Estuary data were provided by the&nbsp;
        <OutboundLink to="http://www.pacificfishhabitat.org/">
          Pacific Marine & Estuarine Fish Habitat Partnership
        </OutboundLink>
        &nbsp;and the&nbsp;
        <OutboundLink to="http://assessment.fishhabitat.org/">
          National Fish Habitat Partnership
        </OutboundLink>
        .
      </Box>
      <Image
        src={ExploreImg}
        alt="Explore screenshot"
        variant="images.screenshot"
      />
    </Grid>
  </Container>
)

export default About

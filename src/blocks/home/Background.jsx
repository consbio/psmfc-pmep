import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Box, Container, Grid, Text, Heading } from 'theme-ui'

import { BackgroundImage } from 'components/Image'
import { OutboundLink } from 'components/Link'
import List from 'components/elements/List'

import { bioticTypes, bioticInfo } from '../../../config/constants'

const Background = () => {
  const data = useStaticQuery(graphql`
    query BackgroundSectionQuery {
      image: file(relativePath: { eq: "5452214882_af06b1e896_o.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            formats: [AUTO, WEBP]
            placeholder: BLURRED
          )
        }
      }
    }
  `)
  return (
    <BackgroundImage
      image={data.image.childImageSharp.gatsbyImageData}
      credits={{
        author: 'Salmon River by Sam Beebe',
        url: 'https://www.flickr.com/photos/28585409@N04/5452214882',
      }}
    >
      <Container variant="section-dark">
        <Heading as="h2" sx={{ color: '#FFF' }}>
          Where a river meets the ocean
        </Heading>
        <Text as="p">
          Estuaries and nearshore habitats are ranked among the world’s most
          productive ecosystems, providing social, ecological, cultural and
          economic benefits as well as a full array of ecosystem services. The
          constantly changing water chemistry, water level, and sedimentation
          creates unique challenges and opportunities for the organisms that
          make their homes in estuaries.
          <br />
          <br />
          The Pacific Marine & Estuarine Fish Habitat Partnership (PMEP) mapped
          the current and historic extent of estuaries using models of extreme
          high water levels and high resolution elevation information. This
          allowed PMEP to determine areas that are inundated by the highest
          annual tides. PMEP then used the National Wetland Inventory, local
          knowledge, and other information to refine these boundaries. These
          estuary boundaries encompass all tidal wetlands, and they extend from
          the ocean to the head of the tide, including the freshwater tidal
          zone.
        </Text>

        <Grid columns={[0, '2fr 1fr']} gap={6} sx={{ mt: '1rem' }}>
          <Text as="p">
            PMEP mapped habitats within the estuary boundaries based on the
            dominant vegetation type for a given area, using information from
            the National Wetlands Inventory and NOAA&apos;s Coastal Change
            Analysis Program. These habitat types are based on the&nbsp;
            <OutboundLink to="https://iocm.noaa.gov/cmecs/">
              Coastal and Marine Ecological Classification Standard
            </OutboundLink>
            .
            <br />
            <br />
            For more information and data downloads, please&nbsp;
            <OutboundLink to="http://www.pacificfishhabitat.org/data/">
              click here
            </OutboundLink>
            .&nbsp; You can explore these data interactively and overlay with
            many additional spatial data layers using the&nbsp;
            <OutboundLink to="https://nplcc.databasin.org/galleries/db581e2725634ba2a8a8841395d28905">
              North Pacific Landscape Conservation Cooperative&apos;s
              Conservation Planning Atlas
            </OutboundLink>
            . You can also explore these data interactively with additional
            information about tidal wetland loss and restoration projects using
            the&nbsp;
            <a to="https://psmfc.maps.arcgis.com/apps/webappviewer/index.html?id=f25b8d649f2a46cbafc5c66fe21c99de">
              PMEP West Coast Estuary Viewer
            </a>
            .
          </Text>

          <Box>
            <Heading as="h4">Estuarine biotic habitats:</Heading>
            <List sx={{ color: 'highlight.500' }}>
              {bioticTypes.map((b) => (
                <li key={b}>
                  {bioticInfo[b].link ? (
                    <OutboundLink to={bioticInfo[b].link}>
                      {bioticInfo[b].label}
                    </OutboundLink>
                  ) : (
                    bioticInfo[b].label
                  )}
                </li>
              ))}
            </List>
          </Box>
        </Grid>
      </Container>
    </BackgroundImage>
  )
}

export default Background

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Box, Heading } from 'theme-ui'

import { BackgroundImage } from 'components/Image'
import { OutboundLink } from 'components/Link'
import List from 'components/elements/List'

const Threats = () => {
  const data = useStaticQuery(graphql`
    query ThreatsSectionQuery {
      image: file(
        relativePath: { eq: "Humboldt_Bay_and_Eureka_aerial_view.jpg" }
      ) {
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
        author: 'Humboldt Bay by U.S. Army Corps of Engineers',
        url:
          'https://commons.wikimedia.org/wiki/File:Humboldt_Bay_and_Eureka_aerial_view.jpg',
      }}
    >
      <Container variant="section-dark">
        <Heading as="h2">Estuaries are under threat</Heading>
        <Box as="p">
          Estuaries and nearshore marine environments have been significantly
          altered due to human development activities. Projected increases in
          human population and activities in and around estuaries and nearshore
          areas, including watersheds, threaten the future of these important
          habitats. In addition, new stressors are emerging due to climate
          change, including ocean acidification, rising sea surface
          temperatures, increased storm intensities and extreme wave heights,
          rising sea levels, expanded hypoxic zones, and changes in sediment
          transport.
        </Box>

        <Heading as="h3" sx={{ mt: '2rem' }}>
          Vegetated tidal wetland loss:
        </Heading>
        <Box as="p">
          Many areas of vegetated tidal wetlands have been lost to agriculture,
          development, and other land use changes. PMEP recently assessed
          vegetated tidal wetland loss by comparing the current extent of tidal
          wetlands in the{' '}
          <OutboundLink to="https://www.fws.gov/wetlands/">
            National Wetland Inventory
          </OutboundLink>{' '}
          (NWI) to the historical estuary extent shown in this tool. Open water
          and aquatic vegetated areas were excluded from the analysis. This
          approach worked best for larger estuaries. Changes in estuary
          topography due to fill, outdated information from the NWI, and
          incomplete information on restored tidal wetlands may result in errors
          in these estimates of tidal wetland loss.
          <br />
          <br />
          Where information is available, this assessment includes details about
          vegetated tidal wetlands that have been restored.
          <br />
          <br />
          For more information about tidal loss and restoration, please see the{' '}
          <OutboundLink to="http://www.pacificfishhabitat.org/data/tidal-wetlands-loss-assessment">
            assessment overview page.
          </OutboundLink>
        </Box>

        <Heading as="h3" sx={{ mt: '2rem' }}>
          Risk of fish habitat degradation:
        </Heading>
        <Box as="p">
          In 2015 the National Fish Habitat Partnership assessed the status of
          fish habitats across the United States. This assessment analyzed
          disturbance factors that impact the quality of fish habitat,
          including:
        </Box>

        <List>
          <li>
            River discharge: flow magnitude, duration of pulses, and density of
            dams
          </li>
          <li>
            Pollution: density of point solution sites, including Superfind
            sites and mines
          </li>
          <li>
            Eutrophication (excess nutrients in water): measures of chlorophyl
            content in the water, algae blooms, dissolved oxygen, and nutrient
            levels
          </li>
          <li>
            Land cover: percent cover and trends of urban, agriculture, and
            wetland land cover
          </li>
        </List>

        <Box as="p" sx={{ mt: '1rem' }}>
          These factors were combined to create an overall index that shows risk
          to fish habitat degradation. Not all factors could be assessed for all
          estuaries; in this case at least three of the four factors were used.
          <br />
          <br />
          For more information about this assessment, please see the{' '}
          <OutboundLink to="http://assessment.fishhabitat.org/">
            2015 Report
          </OutboundLink>
          .
        </Box>
      </Container>
    </BackgroundImage>
  )
}

export default Threats

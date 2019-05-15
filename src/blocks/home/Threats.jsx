import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { BackgroundImage } from 'components/Image'
import { OutboundLink } from 'components/Link'
import { DarkSection as Section, InverseTitle as Title } from './styles'

const Threats = () => {
  const data = useStaticQuery(graphql`
    query ThreatsSectionQuery {
      image: file(
        relativePath: { eq: "Humboldt_Bay_and_Eureka_aerial_view.jpg" }
      ) {
        childImageSharp {
          fluid(maxWidth: 3200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <BackgroundImage
      fluid={data.image.childImageSharp.fluid}
      credits={{
        author: 'Humboldt Bay by U.S. Army Corps of Engineers',
        url:
          'https://commons.wikimedia.org/wiki/File:Humboldt_Bay_and_Eureka_aerial_view.jpg',
      }}
    >
      <Section>
        <Title>Estuaries are under threat</Title>
        <p>
          Estuaries and nearshore marine environments have been significantly
          altered due to human development activities. Projected increases in
          human population and activities in and around estuaries and nearshore
          areas, including watersheds, threaten the future of these important
          habitats. In addition, new stressors are emerging due to climate
          change, including ocean acidification, rising sea surface
          temperatures, increased storm intensities and extreme wave heights,
          rising sea levels, expanded hypoxic zones, and changes in sediment
          transport.
        </p>

        <p>
          In 2015 the National Fish Habitat Partnership assessed the status of
          fish habitats across the United States. This assessment analyzed
          disturbance factors that impact the quality of fish habitat,
          including:
        </p>

        <ul>
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
        </ul>

        <p>
          These factors were combined to create an overall index that shows risk
          to fish habitat degradation. Not all factors could be assessed for all
          estuaries; in this case at least three of the four factors were used.
        </p>

        <p>
          For more information about these assessments, please see the{' '}
          <OutboundLink
            from="/"
            to="http://assessment.fishhabitat.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            2015 Report
          </OutboundLink>
          .
        </p>
      </Section>
    </BackgroundImage>
  )
}

export default Threats

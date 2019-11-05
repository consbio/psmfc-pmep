import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { BackgroundImage } from 'components/Image'
import { Box, Flex } from 'components/Grid'
import { OutboundLink } from 'components/Link'
import styled, { themeGet } from 'util/style'
import { DarkSection as Section, InverseTitle as Title } from './styles'
import { bioticTypes, bioticInfo } from '../../../config/constants'

const Columns = styled(Flex).attrs({
  flexWrap: 'wrap',
  justifyContent: 'space-between',
})``

const Column = styled(Box).attrs({
  width: ['100%', '100%', '30%'],
})``

const WideColumn = styled(Box).attrs({
  width: ['100%', '100%', '60%'],
})``

const BioticListHeader = styled.h4`
  color: #fff;
  margin-bottom: 0.5em;
`

const BioticList = styled.ul`
  li {
    color: ${themeGet('colors.highlight.500')};
  }
`

const Background = () => {
  const data = useStaticQuery(graphql`
    query BackgroundSectionQuery {
      image: file(relativePath: { eq: "5452214882_af06b1e896_o.jpg" }) {
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
        author: 'Salmon River by Sam Beebe',
        url: 'https://www.flickr.com/photos/28585409@N04/5452214882',
      }}
    >
      <Section>
        <Title>Where a river meets the ocean</Title>
        <p>
          Estuaries and nearshore habitats are ranked among the world’s most
          productive ecosystems, providing social, ecological, cultural and
          economic benefits as well as a full array of ecosystem services. The
          constantly changing water chemistry, water level, and sedimentation
          creates unique challenges and opportunities for the organisms that
          make their homes in estuaries.
        </p>

        <p>
          The Pacific Marine & Estuarine Fish Habitat Partnership (PMEP) mapped
          the current and historic extent of estuaries using models of extreme
          high water levels and high resolution elevation information. This
          allowed PMEP to determine areas that are inundated by the highest
          annual tides. PMEP then used the National Wetland Inventory, local
          knowledge, and other information to refine these boundaries. These
          estuary boundaries encompass all tidal wetlands, and they extend from
          the ocean to the head of the tide, including the freshwater tidal
          zone.
        </p>

        <Columns>
          <WideColumn>
            <p>
              PMEP mapped habitats within the estuary boundaries based on the
              dominant vegetation type for a given area, using information from
              the National Wetlands Inventory and NOAA&apos;s Coastal Change
              Analysis Program. These habitat types are based on the&nbsp;
              <OutboundLink
                from="/"
                to="https://iocm.noaa.gov/cmecs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coastal and Marine Ecological Classification Standard
              </OutboundLink>
              .
              <br />
              <br />
              For more information and data downloads, please&nbsp;
              <OutboundLink
                from="/"
                to="http://www.pacificfishhabitat.org/data/"
                target="_blank"
                rel="noopener noreferrer"
              >
                click here
              </OutboundLink>
              .&nbsp; You can explore these data interactively and overlay with
              many additional spatial data layers using the&nbsp;
              <OutboundLink
                from="/"
                to="https://nplcc.databasin.org/galleries/db581e2725634ba2a8a8841395d28905"
                target="_blank"
                rel="noopener noreferrer"
              >
                North Pacific Landscape Conservation Cooperative&apos;s
                Conservation Planning Atlas
              </OutboundLink>
              . You can also explore these data interactively with additional
              information about tidal wetland loss and restoration projects
              using the&nbsp;
              <a
                from="/"
                to="https://psmfc.maps.arcgis.com/apps/webappviewer/index.html?id=f25b8d649f2a46cbafc5c66fe21c99de"
                target="_blank"
                rel="noopener noreferrer"
              >
                PMEP West Coast Estuary Viewer
              </a>
              .
            </p>
          </WideColumn>
          <Column>
            <BioticListHeader>Estuarine biotic habitats:</BioticListHeader>
            <BioticList>
              {bioticTypes.map(b => (
                <li key={b}>
                  {bioticInfo[b].link ? (
                    <OutboundLink
                      from="/"
                      to={bioticInfo[b].link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {bioticInfo[b].label}
                    </OutboundLink>
                  ) : (
                    bioticInfo[b].label
                  )}
                </li>
              ))}
            </BioticList>
          </Column>
        </Columns>
      </Section>
    </BackgroundImage>
  )
}

export default Background

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { GatsbyImage } from 'gatsby-plugin-image'

import { Box, Flex } from 'components/Grid'
import { OutboundLink } from 'components/Link'
import styled, { themeGet } from 'util/style'
import { Section, Title } from './styles'

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

const StyledList = styled.ul`
  padding-left: 1em;
`

const Caption = styled.div`
  font-size: 0.8em;
  line-height: 1.2;
  color: ${themeGet('colors.grey.600')};
  text-align: right;
  margin-bottom: 1.5rem;
`

const Habitat = () => {
  const data = useStaticQuery(graphql`
    query HabitatSectionQuery {
      image: file(relativePath: { eq: "24284520556_f27ecedab4_z.jpg" }) {
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
    <Section>
      <Title>Estuaries provide essential habitat</Title>
      <Columns>
        <WideColumn>
          <p>
            Thousands of species of birds, mammals, fish and other wildlife
            depend on estuarine habitats as places to live, feed and reproduce.
            Many marine organisms, including most commercially-important species
            of fish, depend on estuaries at some point during their development.
            <br />
            <br />
            In 2014, The Pacific Marine & Estuarine Fish Habitat Partnership
            assessed the nursery habitat potential for 15 ecologically and
            economically important fish and invertebrate species within&nbsp;
            <OutboundLink
              from="/"
              to="http://pmep.psmfc.org/wp-content/uploads/2017/09/tnc_ca_fishnurseries_lowres_min.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nursery Functions of U.S. West Coast Estuaries: The State of
              Knowledge for Juveniles of Focal Invertebrate and Fish Species.
            </OutboundLink>
            <br />
            <br />
            These species were selected to encompass the diversity of life
            histories, habitat use, and ecological roles of species found in
            estuaries along the West Coast. This assessment compiled information
            on the presence of juveniles or the species in general within many
            estuaries along the West Coast. However, the estuary boundaries have
            been refined since that time, which means that species were assessed
            for somewhat different boundaries than those shown in this tool.
            Some records were based on large estuary systems that have since
            been mapped as smaller units. Not all estuaries were inventoried for
            species, so the absence of information about a species in a given
            estuary cannot be taken to indicate that the species is indeed
            absent from that estuary.
          </p>
        </WideColumn>
        <Column>
          <GatsbyImage
            image={data.image.childImageSharp.gatsbyImageData}
            alt="Double Crested Cormorant and Starry Flounder"
          />

          <Caption>
            Photo credit: Double-Crested Cormorant with Starry Flounder by&nbsp;
            <OutboundLink
              from="/"
              to="https://www.flickr.com/photos/jamesabbott1963/24284520556/in/photostream/"
              target="_blank"
              rel="noopener noreferrer"
            >
              James Abbott
            </OutboundLink>
          </Caption>

          <h4>Focal fish species:</h4>
          <StyledList>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46561010"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bat Ray
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46568119"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brown Rockfish
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46570506"
                target="_blank"
                rel="noopener noreferrer"
              >
                California Halibut
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46563139"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chinook Salmon
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46563137"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coho Salmon
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46570134"
                target="_blank"
                rel="noopener noreferrer"
              >
                English Sole
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46561178"
                target="_blank"
                rel="noopener noreferrer"
              >
                Green Sturgeon
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46560018"
                target="_blank"
                rel="noopener noreferrer"
              >
                Leopard Shark
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/1156440"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pacific Herring
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46572845"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shiner Perch
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46569026"
                target="_blank"
                rel="noopener noreferrer"
              >
                Staghorn Sculpin
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46570116"
                target="_blank"
                rel="noopener noreferrer"
              >
                Starry Flounder
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46563138"
                target="_blank"
                rel="noopener noreferrer"
              >
                Steelhead
              </OutboundLink>
            </li>
          </StyledList>

          <h4>Focal invertebrate species:</h4>
          <StyledList>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/1021223"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bay Shrimp
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                from="/"
                to="http://eol.org/pages/46505946"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dungeness Crab
              </OutboundLink>
            </li>
          </StyledList>
        </Column>
      </Columns>
    </Section>
  )
}

export default Habitat

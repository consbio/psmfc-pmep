import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Container, Heading, Box, Grid } from 'theme-ui'

import { GatsbyImage } from 'gatsby-plugin-image'

import { OutboundLink } from 'components/Link'
import List from 'components/elements/List'

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
    <Container variant="section">
      <Heading as="h2">Estuaries provide essential habitat</Heading>
      <Grid columns={[0, '2fr 1fr']} gap={6}>
        <Box as="p">
          Thousands of species of birds, mammals, fish and other wildlife depend
          on estuarine habitats as places to live, feed and reproduce. Many
          marine organisms, including most commercially-important species of
          fish, depend on estuaries at some point during their development.
          <br />
          <br />
          In 2014, The Pacific Marine & Estuarine Fish Habitat Partnership
          assessed the nursery habitat potential for 15 ecologically and
          economically important fish and invertebrate species within&nbsp;
          <OutboundLink to="http://pmep.psmfc.org/wp-content/uploads/2017/09/tnc_ca_fishnurseries_lowres_min.pdf">
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
          for somewhat different boundaries than those shown in this tool. Some
          records were based on large estuary systems that have since been
          mapped as smaller units. Not all estuaries were inventoried for
          species, so the absence of information about a species in a given
          estuary cannot be taken to indicate that the species is indeed absent
          from that estuary.
        </Box>
        <Box>
          <GatsbyImage
            image={data.image.childImageSharp.gatsbyImageData}
            alt="Double Crested Cormorant and Starry Flounder"
          />

          <Box
            sx={{
              fontSize: '0.8em',
              lineHeight: 1.2,
              color: 'grey.600',
              textAlign: 'right',
              mb: '1.5rem',
            }}
          >
            Photo credit: Double-Crested Cormorant with Starry Flounder by&nbsp;
            <OutboundLink to="https://www.flickr.com/photos/jamesabbott1963/24284520556/in/photostream/">
              James Abbott
            </OutboundLink>
          </Box>

          <Heading as="h4">Focal fish species:</Heading>
          <List>
            <li>
              <OutboundLink to="http://eol.org/pages/46561010">
                Bat Ray
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46568119">
                Brown Rockfish
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46570506">
                California Halibut
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46563139">
                Chinook Salmon
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46563137">
                Coho Salmon
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46570134">
                English Sole
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46561178">
                Green Sturgeon
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46560018">
                Leopard Shark
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/1156440">
                Pacific Herring
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46572845">
                Shiner Perch
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46569026">
                Staghorn Sculpin
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46570116">
                Starry Flounder
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46563138">
                Steelhead
              </OutboundLink>
            </li>
          </List>

          <Heading as="h4" sx={{ mt: '2rem' }}>
            Focal invertebrate species:
          </Heading>
          <List>
            <li>
              <OutboundLink to="http://eol.org/pages/1021223">
                Bay Shrimp
              </OutboundLink>
            </li>
            <li>
              <OutboundLink to="http://eol.org/pages/46505946">
                Dungeness Crab
              </OutboundLink>
            </li>
          </List>
        </Box>
      </Grid>
    </Container>
  )
}

export default Habitat

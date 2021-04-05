import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Box, Flex, Text, Heading, Container, Grid } from 'theme-ui'
import { ChevronDown, Binoculars, SlidersH } from '@emotion-icons/fa-solid'

import { Link } from 'components/Link'
import { BackgroundImage } from 'components/Image'

const Top = () => {
  const data = useStaticQuery(graphql`
    query TopSectionQuery {
      image: file(relativePath: { eq: "6307999051_5d2c4d7ce4_o.jpg" }) {
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
        author: 'Siletz Bay, Oregon by stokes rx',
        url: 'https://www.flickr.com/photos/stokesrx/6307999051',
      }}
    >
      <Container variant="section-dark">
        <Heading as="h1" sx={{ fontSize: ['2rem', '4rem'], mb: '0.5rem' }}>
          Estuaries are essential
        </Heading>
        <Heading
          as="h2"
          sx={{
            fontSize: ['1.5rem', '2.25rem'],
            fontWeight: 'normal',
            pb: '1rem',
            mb: '0.5rem',
            borderBottom: '1px solid',
            borderBottomColor: 'grey.100',
          }}
        >
          to the health of coastal ecosystems
        </Heading>

        <Text as="p">
          These highly dynamic systems, where rivers meet the ocean, provide
          many important ecosystem services. They provide essential habitat for
          a wide range of species, including fish, shellfish, shrimp, and crabs.
          Estuaries have also been significantly altered and degraded by human
          activities. Many along the West Coast are in poor condition or have
          lost significant habitat.
          <br />
          <br />
          This viewer allows you explore estuaries along the coastline of
          Washington, Oregon, and California. Learn more about estuaries and
          their role in providing habitat for key species. Get involved to help
          restore these important ecosystems.
          <br />
        </Text>

        <Grid
          columns={[0, 2]}
          gap={5}
          sx={{
            mt: '1.5rem',
            mx: '0.5rem',
            color: 'grey.900',
            a: {
              color: 'link',
            },
            '&>div': {
              bg: 'grey.100',
              borderRadius: '0.25rem',
              h3: {
                fontWeight: 'normal',
                fontSize: ['1.5rem', '1.5rem', '1.75rem'],
                flex: '0 0 auto',
                mb: 0,
              },
              p: '1rem',
              '&:not(:first-of-type)': {
                mt: ['1rem', 0],
              },
            },
          }}
        >
          <Box>
            <Flex sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  marginRight: '0.5rem',
                  flex: '0 0 auto',
                  fontSize: ['1.5rem', '1.5rem', '1.75rem'],
                  color: 'grey.600',
                }}
              >
                <SlidersH size="1em" />
              </Box>
              <Heading as="h3">Compare Estuaries</Heading>
            </Flex>
            <Text sx={{ my: '0.5rem' }}>
              Compare and select estuaries based on type, size, and more.
            </Text>
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/compare">Start comparing</Link>
            </Box>
          </Box>

          <Box>
            <Flex sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  marginRight: '0.5rem',
                  flex: '0 0 auto',
                  fontSize: ['1.5rem', '1.5rem', '1.75rem'],
                  color: 'grey.600',
                }}
              >
                <Binoculars size="1em" />
              </Box>
              <Heading as="h3">Compare Estuaries</Heading>
            </Flex>
            <Text sx={{ my: '0.5rem' }}>
              Explore estuaries along the West Coast and learn more about them.
            </Text>
            <Box sx={{ textAlign: 'center' }}>
              <Link to="/explore">Start exploring</Link>
            </Box>
          </Box>
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <br />
          <br />
          <Text sx={{ fontSize: '1.5rem' }}>Learn more about estuaries...</Text>

          <ChevronDown size="3rem" css={{ color: 'grey.100' }} />
        </Box>
      </Container>
    </BackgroundImage>
  )
}

export default Top

import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Text } from 'rebass'
import { FaChevronDown } from 'react-icons/fa'

import { Flex } from 'components/Grid'
import { BackgroundImage } from 'components/Image'
import CallToActionBox from 'components/elements/CallToActionBox'
import styled, { themeGet } from 'util/style'

import { DarkSection } from './styles'

const TopSection = styled(DarkSection)`
  h1,
  h2 {
    text-shadow: 2px 2px 2px #000;
  }

  h1 {
    margin-bottom: 0.5rem;
  }

  h2 {
    font-weight: normal;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${themeGet('colors.grey.100')};
  }

  h3 {
    font-weight: normal;
    font-size: 1.5em;
  }
`

const StyledCTA = styled(CallToActionBox).attrs({
  width: ['100%', '50%', '50%'],
})`
  a {
    color: #3273dc;
  }
`

const StyledDownIcon = styled(FaChevronDown).attrs({
  size: '3rem',
})`
  color: ${themeGet('colors.grey.100')};
  width: 3rem;
  height: 3rem;
`

const Centered = styled.div`
  text-align: center;
`

const Top = () => {
  const data = useStaticQuery(graphql`
    query TopSectionQuery {
      image: file(relativePath: { eq: "6307999051_5d2c4d7ce4_o.jpg" }) {
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
        author: 'Siletz Bay, Oregon by stokes rx',
        url: 'https://www.flickr.com/photos/stokesrx/6307999051',
      }}
    >
      <TopSection>
        <Text as="h1" fontSize={['2rem', '4rem']}>
          Estuaries are essential
        </Text>
        <Text as="h2" fontSize={['1.5rem', '2.25rem']}>
          to the health of coastal ecosystems
        </Text>

        <p>
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
        </p>

        <Flex alignItems="center" justifyContent="space-between">
          <StyledCTA
            icon="slidersH"
            title="Compare estuaries"
            link="/compare"
            linkLabel="Start comparing"
          >
            Compare and select estuaries based on type, size, and more.
          </StyledCTA>
          <StyledCTA
            icon="binoculars"
            title="Explore estuaries"
            link="/explore"
            linkLabel="Start exploring"
          >
            Explore estuaries along the West Coast and learn more about them.
          </StyledCTA>
        </Flex>

        <Centered>
          <br />
          <br />
          <h3>Learn more about estuaries...</h3>
          <StyledDownIcon />
        </Centered>
      </TopSection>
    </BackgroundImage>
  )
}

export default Top

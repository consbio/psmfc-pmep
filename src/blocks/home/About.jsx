import React from 'react'
import { Image } from 'rebass'

import { Box, Flex } from 'components/Grid'
import { Link } from 'components/Link'
import styled, { themeGet } from 'util/style'
import CompareImg from 'images/compare.jpg'
import ExploreImg from 'images/explore.jpg'
import SiteLogo from 'images/logo.svg'
import { Section, Title } from './styles'

const Columns = styled(Flex).attrs({
  flexWrap: 'wrap',
  justifyContent: 'space-between',
})``

const Column = styled(Box).attrs({
  width: ['100%', '100%', '48%'],
})``

const Screenshot = styled.img`
  border: 1px solid ${themeGet('colors.grey.200')};
  box-shadow: 1px 1px 3px ${themeGet('colors.grey.500')};
  margin: 1rem;
`

const Logo = styled(Image).attrs({
  src: SiteLogo,
  width: ['2rem', '4rem'],
  my: 0,
  mr: '0.5rem',
  as: 'img',
})``

const About = () => (
  <Section>
    <Title>
      <Flex alignItems="center">
        <Logo />
        <div>The West Coast Estuaries Explorer</div>
      </Flex>
    </Title>
    <Columns>
      <Column>
        <p>
          This application enables you to&nbsp;
          <Link to="/compare">compare</Link>&nbsp; estuaries to each other along
          the coastlines of Washington, Oregon, and California. You can combine
          dynamic filters and an interactive map to find specific estuary types
          you are interested in, such as large river delta estuaries which often
          have extensive diking; small, riverine estuaries that are at the
          lowest risk to fish habitat degradation; or estuaries contain species
          that interest you. Only want to compare estuaries in a specific area?
          Simply zoom the map in to that area, and the filters automatically
          update to show you the number of estuaries in that area that meet
          different conditions.
        </p>
      </Column>
      <Column>
        <Screenshot src={CompareImg} alt="Compare screenshot" />
      </Column>
    </Columns>

    <Columns>
      <Column>
        <p>
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
          <a
            href="http://www.pacificfishhabitat.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pacific Marine & Estuarine Fish Habitat Partnership
          </a>
          &nbsp;and the&nbsp;
          <a
            href="http://assessment.fishhabitat.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            National Fish Habitat Partnership
          </a>
          .
        </p>
      </Column>
      <Column>
        <Screenshot src={ExploreImg} alt="Explore screenshot" />
      </Column>
    </Columns>
  </Section>
)

export default About

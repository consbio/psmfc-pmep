import React from 'react'

import { Box, Flex } from 'components/Grid'
import { OutboundLink } from 'components/Link'
import styled, { themeGet } from 'util/style'

import Logo from 'images/nplcc_logo.png'
import { Section as BaseSection, Title } from './styles'

const Section = styled(BaseSection)`
  border-top: 0.5rem solid ${themeGet('colors.primary.400')};
`

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

const NPLCC = () => (
  <Section>
    <Title>North Pacific Landscape Conservation Cooperative</Title>
    <Columns>
      <WideColumn>
        <p>
          The North Pacific Landscape Conservation Cooperative (NPLCC)
          collaborates with many partners to put science to work toward more
          effective, landscape-level conservation. The NPLCC prioritizes
          identification and sharing of information about natural resources
          throughout the region.
          <br />
          <br />
          To get involved and find out more about NPLCC, including available
          funding opportunities, projects supported by NPLCC, and additional
          conservation-oriented resources within the region, please&nbsp;
          <OutboundLink
            from="/"
            to="http://www.northpacificlcc.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </OutboundLink>
          .
          <br />
          <br />
          To access and collaborate around geospatial data within the NPLCC
          region, please visit the&nbsp;
          <OutboundLink
            from="/"
            to="https://nplcc.databasin.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            NPLCC Conservation Planning Atlas
          </OutboundLink>
          .
        </p>
      </WideColumn>
      <Column>
        <img src={Logo} alt="NPLCC logo" />
      </Column>
    </Columns>
  </Section>
)

export default NPLCC

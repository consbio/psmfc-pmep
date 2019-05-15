import React from 'react'

import { Box, Flex } from 'components/Grid'
import { OutboundLink } from 'components/Link'
import styled, { themeGet } from 'util/style'

import Logo from 'images/cbi_logo.png'
import { Section as BaseSection } from './styles'

const Section = styled(BaseSection)`
  border-top: 0.5rem solid ${themeGet('colors.primary.500')};

  p {
    font-size: 0.9rem;
    color: ${themeGet('colors.grey.700')};
    line-height: 1.4;
  }
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

const CBI = () => (
  <Section>
    <Columns>
      <WideColumn>
        <p>
          This application was created by the&nbsp;
          <OutboundLink
            from="/"
            to="https://consbio.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conservation Biology Institute
          </OutboundLink>
          &nbsp; (CBI) in partnership with the&nbsp;
          <OutboundLink
            from="/"
            to="http://www.pacificfishhabitat.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pacific Marine & Estuarine Fish Habitat Partnership
          </OutboundLink>
          &nbsp;and with financial support from the&nbsp;
          <OutboundLink
            from="/"
            to="http://www.northpacificlcc.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            North Pacific Landscape Conservation Cooperative{' '}
          </OutboundLink>
          and National Oceanic and Atmpospheric Administration -{' '}
          <OutboundLink
            from="/"
            to="https://www.fisheries.noaa.gov/about/office-habitat-conservation"
            target="_blank"
          >
            Office of Habitat Conservation
          </OutboundLink>
          . CBI provides science and software development to support the
          conservation of biodiversity.
        </p>
      </WideColumn>
      <Column>
        <img src={Logo} alt="CBI logo" />
      </Column>
    </Columns>
  </Section>
)

export default CBI

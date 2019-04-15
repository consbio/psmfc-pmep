import React from 'react'

import { Box, Flex } from 'components/Grid'
import { OutboundLink } from 'components/Link'
import styled from 'util/style'

import Logo from 'images/pmep_logo.png'
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

const PMEP = () => (
  <Section>
    <Title>Pacific Marine &amp; Estuarine Fish Habitat Partnership</Title>
    <Columns>
      <WideColumn>
        <p>
          The Pacific Marine & Estuarine Fish Habitat Partnership (PMEP) works
          with partners to protect, enhance, and restore ecological processes
          and habitats within estuaries and nearshore marine environments. PMEP
          focuses on enhancing juvenile fish habitat, water quality, and water
          quantity in nearshore marine and estuary habitats, and also on
          connectivity between tidal and nearshore marine areas. These efforts
          prioritize healthy native fish communities and sustainable human uses
          that depend on them.
          <br />
          <br />
          To get involved and find out more about PMEP, available funding
          opportunities, and projects supported by PMEP, please&nbsp;
          <OutboundLink
            from="/"
            to="http://www.pacificfishhabitat.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </OutboundLink>
          .
        </p>
      </WideColumn>
      <Column>
        <img src={Logo} alt="PMEP logo" />
      </Column>
    </Columns>
  </Section>
)

export default PMEP

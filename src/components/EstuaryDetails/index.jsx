import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { FaRegTimesCircle } from 'react-icons/fa'

import { Button } from 'components/Button'
import { Columns, Column } from 'components/Grid'
import ExpandableParagraph from 'components/elements/ExpandableParagraph'
import HelpText from 'components/elements/HelpText'
import Tabs, { Tab as BaseTab } from 'components/Tabs'
import styled, { themeGet } from 'util/style'
import { formatNumber } from 'util/format'

import SpeciesList from './SpeciesList'
import BioticList from './BioticList'
import NFHP from './NFHP'
import EstuaryType from './EstuaryType'
import { stateNames, estuaryTypes } from '../../../config/constants'

const Header = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${themeGet('colors.primary.100')};
  border-bottom: 1px solid ${themeGet('colors.grey.200')};
  line-height: 1.2;
`

const Title = styled(Text).attrs({
  fontSize: ['1rem', '1rem', '1.5rem'],
})``

const Subtitle = styled(Text).attrs({
  fontSize: ['0.8rem', '0.8rem', '1rem'],
})``

const BackIcon = styled(FaRegTimesCircle).attrs({ size: '1.5rem' })`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  color: ${themeGet('colors.grey.600')};
  &:hover {
    color: ${themeGet('colors.grey.900')};
  }
`

const Acres = styled(Text).attrs({ textAlign: 'right' })`
  color: ${themeGet('colors.grey.700')};
  font-size: 0.8rem;
`

const ZoomButton = styled(Button)`
  font-size: 0.8rem;
  margin-bottom: 1rem;
  padding: 0.1rem 0.5rem;
`

const TabHeader = styled.div`
  font-size: 1.25rem;
`
const Value = styled.div`
  padding-left: 1rem;
  color: ${themeGet('colors.grey.900')};
`

const Section = styled.section`
  &:not(:first-child) {
    padding-top: 0.5rem;
    margin-top: 0.5rem;
    border-top: 1px solid ${themeGet('colors.grey.200')};
  }
`

const TabContainer = styled(Tabs)`
  height: 100%;
`

const Tab = styled(BaseTab)`
  padding: 1rem;
  overflow-y: auto;
  flex: 1 1 auto;
`

const EstuaryDetails = ({
  name,
  state,
  acres,
  type,
  region,
  species,
  biotic,
  SoKJoin,
  nfhp2015,
  NFHPJoin,
  showZoom,
  onBack,
  onZoomTo,
}) => {
  const countSpecies = Object.entries(species).length
  const countBiotic = Object.entries(biotic).length
  const areaBiotic = Object.values(biotic).reduce((sum, area) => sum + area, 0)

  const handleZoom = () => {
    onZoomTo()
  }

  return (
    <>
      <Header>
        <Columns>
          <Column flex={1}>
            <Title>{name}</Title>
          </Column>
          <Column flex={0}>
            <BackIcon onClick={onBack} />
          </Column>
        </Columns>
        <Subtitle width="100%">
          <Columns>
            <Column>{stateNames[state]}</Column>
            <Column>
              <Acres>{formatNumber(acres, 0)} acres</Acres>
            </Column>
          </Columns>
        </Subtitle>
      </Header>

      <TabContainer>
        <Tab id="overview" label="Overview">
          {showZoom && (
            <Text textAlign="center">
              <ZoomButton primary onClick={handleZoom}>
                Zoom To Estuary
              </ZoomButton>
            </Text>
          )}

          <Section>
            <TabHeader>Estuary Type:</TabHeader>
            <Value>
              {estuaryTypes[type].label}
              <br />
              <br />
              <ExpandableParagraph snippet={estuaryTypes[type].snippet}>
                <EstuaryType type={type} />
              </ExpandableParagraph>
            </Value>
          </Section>

          <Section>
            <TabHeader>Region:</TabHeader>
            <Value>{region}</Value>
          </Section>

          <Section>
            <TabHeader>Focal species:</TabHeader>
            <Value>
              {countSpecies || 'No'} focal species are found in this estuary.
            </Value>
          </Section>
          <Section>
            <TabHeader>Biotic habitats:</TabHeader>
            <Value>
              {countBiotic || 'No'} biotic habitats{' '}
              {countBiotic && `(${formatNumber(areaBiotic)} acres)`} have been
              mapped in this estuary.
            </Value>
          </Section>
          <br />
        </Tab>
        <Tab id="species" label="Species">
          <TabHeader>Focal species present:</TabHeader>
          <SpeciesList species={species} status={SoKJoin} />
        </Tab>
        <Tab id="habitats" label="Habitats">
          <TabHeader>Biotic habitats:</TabHeader>
          <BioticList biotic={biotic} />
        </Tab>
        <Tab id="threats" label="Threats">
          <Section>
            <TabHeader>Risk of fish habitat degradation:</TabHeader>
            <NFHP level={nfhp2015} status={NFHPJoin} />
          </Section>
          {/* TODO: tidal wetland loss goes here */}
        </Tab>
      </TabContainer>
    </>
  )
}

EstuaryDetails.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  acres: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  species: PropTypes.object.isRequired,
  biotic: PropTypes.object.isRequired,
  SoKJoin: PropTypes.number.isRequired,
  nfhp2015: PropTypes.number.isRequired,
  NFHPJoin: PropTypes.number.isRequired,
  showZoom: PropTypes.bool,
  onBack: PropTypes.func,
  onZoomTo: PropTypes.func,
}

EstuaryDetails.defaultProps = {
  showZoom: true,
  onBack: () => {},
  onZoomTo: () => {},
}

export default EstuaryDetails

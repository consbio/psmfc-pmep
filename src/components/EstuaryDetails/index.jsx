import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { FaRegTimesCircle } from 'react-icons/fa'

import { Flex, Column } from 'components/Grid'
import Tabs, { Tab as BaseTab } from 'components/Tabs'
import styled, { themeGet } from 'util/style'
import { formatNumber } from 'util/format'
import SpeciesList from './SpeciesList'
import BioticList from './BioticList'
import NFHP from './NFHP'
import { stateNames } from '../../../config/constants'

const Header = styled(Flex).attrs({
  alignItems: 'top',
  flex: 0,
  justifyContent: 'space-between',
})`
  padding: 0.5rem 1rem;
  background-color: ${themeGet('colors.primary.0')};
  border-bottom: 1px solid ${themeGet('colors.grey.200')};
  line-height: 1.2;
`

const Title = styled(Text).attrs({
  fontSize: ['1rem', '1rem', '1.5rem'],
})``

const BackIcon = styled(FaRegTimesCircle).attrs({ size: '1.5rem' })`
  cursor: pointer;
  color: ${themeGet('colors.grey.600')};
  &:hover {
    color: ${themeGet('colors.grey.900')};
  }
`

const State = styled(Text).attrs({
  fontSize: ['0.8rem', '0.8rem', '1rem'],
})``

// const Info = styled.div`
//   color: ${themeGet('colors.grey.700')};
//   margin-bottom: 0.5rem;
//   padding-bottom: 0.5rem;
// `

// const RightColumn = styled(Column)`
//   text-align: right;
// `

const TabHeader = styled.div`
  font-size: 1.25rem;
`
const Content = styled.div`
  /* overflow-y: auto;
  flex: 1 1 auto;
  padding: 0.25rem 1rem 2rem; */
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

const Tab = styled(BaseTab)`
  padding: 1rem 1rem 2rem;
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
  onBack,
}) => (
  <>
    <Header>
      <div>
        <Title>{name}</Title>
        <State>{stateNames[state]}</State>
      </div>
      <BackIcon onClick={onBack} />
    </Header>

    <Tabs>
      <Tab id="overview" label="Overview">
        <TabHeader>General information:</TabHeader>
        <Content>
          Region: {region}
          <br />
          Type: {type}
          <br />
          Area: {formatNumber(acres, 0)} acres
        </Content>
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
    </Tabs>
  </>
)

EstuaryDetails.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  species: PropTypes.object.isRequired,
  biotic: PropTypes.object.isRequired,
  SoKJoin: PropTypes.number.isRequired,
  nfhp2015: PropTypes.number.isRequired,
  NFHPJoin: PropTypes.number.isRequired,
  onBack: PropTypes.func,
}

EstuaryDetails.defaultProps = {
  onBack: () => {},
}

export default EstuaryDetails

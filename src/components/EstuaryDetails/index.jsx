import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { FaRegTimesCircle } from 'react-icons/fa'

import { OutboundLink } from 'components/Link'
import { Flex, Box, Columns, Column } from 'components/Grid'
import styled, { themeGet } from 'util/style'
import { formatNumber } from 'util/format'
import SpeciesList from './SpeciesList'
import BioticList from './BioticList'
import { stateNames, nfhpLabels } from '../../../config/constants'

const Header = styled(Flex).attrs({
  alignItems: 'top',
  flex: 0,
  justifyContent: 'space-between',
})`
  padding: 0.5rem 1rem;
  background-color: ${themeGet('colors.primary.200')};
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

const Content = styled.div`
  overflow-y: auto;
  flex: 1 1 auto;
  padding: 0.25rem 1rem 2rem;
`

const Info = styled.div`
  color: ${themeGet('colors.grey.700')};
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
`

const RightColumn = styled(Column)`
  text-align: right;
`

const SectionHeader = styled.div`
  font-size: 1.25rem;
`

const Section = styled.section`
  padding-top: 0.5rem;
  border-top: 1px solid ${themeGet('colors.grey.200')};
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
  onBack,
}) => {
  const hasBiotic = Object.keys(biotic).length > 0

  return (
    <>
      <Header>
        <div>
          <Title>{name}</Title>
          <State>{stateNames[state]}</State>
        </div>
        <BackIcon onClick={onBack} />
      </Header>

      <Content>
        <Info>
          <Columns>
            <Column>Type: {type}</Column>
            <RightColumn textAlign="right">
              {formatNumber(acres, 0)} acres
            </RightColumn>
          </Columns>
          <div>Region: {region}</div>
        </Info>

        <Section>
          <SectionHeader>Focal species present</SectionHeader>
          <SpeciesList species={species} status={SoKJoin} />
        </Section>

        {hasBiotic && (
          <Section>
            <SectionHeader>Biotic habitats</SectionHeader>
            <BioticList biotic={biotic} />
          </Section>
        )}
      </Content>
    </>
  )
}

EstuaryDetails.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  species: PropTypes.object.isRequired,
  biotic: PropTypes.object.isRequired,
  SoKJoin: PropTypes.number.isRequired,
  onBack: PropTypes.func,
}

EstuaryDetails.defaultProps = {
  onBack: () => {},
}

export default EstuaryDetails

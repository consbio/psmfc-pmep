import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Heading, Image, Text, Button } from 'theme-ui'
import { TimesCircle } from '@emotion-icons/fa-regular'

// import { Button } from 'components/Button'
import ExpandableParagraph from 'components/elements/ExpandableParagraph'
import Tabs, { Tab } from 'components/Tabs'
import { OutboundLink } from 'components/Link'
import { formatNumber } from 'util/format'

import SpeciesList from './SpeciesList'
import BioticList from './BioticList'
import TidalWetlandLoss from './TidalWetlandLoss'
import NFHP from './NFHP'
import EstuaryType from './EstuaryType'
import { stateNames, estuaryTypes } from '../../../config/constants'

const getImage = (id) =>
  /* eslint-disable-next-line */
  require(`images/aerial/${id}.jpg`).default

const EstuaryDetails = ({
  id,
  name,
  imageURL,
  imageCredits,
  state,
  acres,
  type,
  region,
  species,
  biotic,
  SoKJoin,
  nfhp2015,
  NFHPJoin,
  twAcres,
  twlAcres,
  twrAcres,
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
      <Box
        sx={{
          py: '0.5rem',
          px: '1rem',
          bg: 'primary.100',
          borderBottom: '1px solid',
          borderBottomColor: 'grey.200',
          lineHeight: 1.2,
        }}
      >
        <Flex
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Box sx={{ flex: '1 1 auto', fontSize: ['1rem', '1rem', '1.5rem'] }}>
            {name}
          </Box>

          <Box
            onClick={onBack}
            sx={{
              flex: '0 0 auto',
              cursor: 'pointer',
              color: 'grey.600',
              '&:hover': {
                color: 'grey.900',
              },
            }}
          >
            <TimesCircle size="1.5rem" />
          </Box>
        </Flex>
        <Flex
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            fontSize: ['0.8rem', '0.8rem', '1rem'],
          }}
        >
          <Box>{stateNames[state]}</Box>
          <Box
            sx={{ textAlign: 'right', color: 'grey.700', fontSize: '0.8rem' }}
          >
            {formatNumber(acres, 0)} acres
          </Box>
        </Flex>
      </Box>

      <Tabs>
        <Tab id="overview" label="Overview">
          {showZoom && (
            <Flex sx={{ justifyContent: 'center', mb: '1rem' }}>
              <Button
                variant="primary"
                onClick={handleZoom}
                sx={{ fontSize: '0.8rem', py: '0.1rem', px: '0.5rem' }}
              >
                Zoom To Estuary
              </Button>
            </Flex>
          )}

          {imageURL !== null && (
            <Box variant="layout.block">
              <OutboundLink from="/" to={imageURL}>
                <Image src={getImage(id)} />
              </OutboundLink>
              {imageCredits && (
                <Box sx={{ fontSize: '0.7rem', color: 'grey.700' }}>
                  Photo:{' '}
                  {imageCredits.url ? (
                    <OutboundLink from="/" to={imageCredits.url}>
                      {imageCredits.credits}
                    </OutboundLink>
                  ) : (
                    imageCredits.credits
                  )}
                </Box>
              )}
            </Box>
          )}

          <Box variant="layout.block">
            <Heading as="h4">Estuary Type:</Heading>
            <Box sx={{ ml: '1rem', color: 'grey.900' }}>
              {estuaryTypes[type].label}
              <br />
              <br />
              <Text variant="help">
                <ExpandableParagraph snippet={estuaryTypes[type].snippet}>
                  <EstuaryType type={type} />
                </ExpandableParagraph>
              </Text>
            </Box>
          </Box>

          <Box variant="layout.block">
            <Heading as="h4">Region:</Heading>
            <Box sx={{ ml: '1rem', color: 'grey.900' }}>{region}</Box>
          </Box>

          <Box variant="layout.block">
            <Heading as="h4">Focal species:</Heading>
            <Box sx={{ ml: '1rem', color: 'grey.900' }}>
              {countSpecies || 'No'} focal species are found in this estuary.
            </Box>
          </Box>

          <Box variant="layout.block">
            <Heading as="h4">Biotic habitats:</Heading>
            <Box sx={{ ml: '1rem', color: 'grey.900' }}>
              {countBiotic || 'No'} biotic habitats{' '}
              {countBiotic && `(${formatNumber(areaBiotic)} acres)`} have been
              mapped in this estuary.
            </Box>
          </Box>
        </Tab>

        <Tab id="species" label="Species">
          <Heading as="h4">Focal species present:</Heading>
          <SpeciesList species={species} status={SoKJoin} />
        </Tab>

        <Tab id="habitats" label="Habitats">
          <Heading as="h4">Biotic habitats:</Heading>
          <BioticList biotic={biotic} />
        </Tab>

        <Tab id="threats" label="Threats">
          <Box variant="layout.block">
            <Heading as="h4">Tidal wetland loss:</Heading>
            <TidalWetlandLoss
              area={twAcres}
              lost={twlAcres}
              restored={twrAcres}
            />
          </Box>

          <Box variant="layout.block">
            <Heading as="h4">Risk of fish habitat degradation:</Heading>
            <NFHP level={nfhp2015} status={NFHPJoin} />
          </Box>
        </Tab>
      </Tabs>
    </>
  )
}

EstuaryDetails.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  imageCredits: PropTypes.object,
  state: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  acres: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  species: PropTypes.object.isRequired,
  biotic: PropTypes.object.isRequired,
  SoKJoin: PropTypes.number.isRequired,
  nfhp2015: PropTypes.number.isRequired,
  NFHPJoin: PropTypes.number.isRequired,
  twAcres: PropTypes.number,
  twlAcres: PropTypes.number,
  twrAcres: PropTypes.number,
  showZoom: PropTypes.bool,
  onBack: PropTypes.func,
  onZoomTo: PropTypes.func,
}

EstuaryDetails.defaultProps = {
  twAcres: null,
  twlAcres: null,
  twrAcres: null,
  imageURL: null,
  imageCredits: null,
  showZoom: true,
  onBack: () => {},
  onZoomTo: () => {},
}

export default EstuaryDetails

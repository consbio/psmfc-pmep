import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'theme-ui'
import { CaretDown, CaretRight } from '@emotion-icons/fa-solid'

import { OutboundLink } from 'components/Link'
import { formatNumber } from 'util/format'
import { bioticInfo } from '../../../config/constants'

const BioticListItem = ({ type, acres, maxAcres }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen)

  const { label, color, description, link } = bioticInfo[type]
  const position = (100 * acres) / maxAcres

  const Caret = isOpen ? CaretDown : CaretRight

  return (
    <Box
      sx={{
        '&:not(:first-of-type)': {
          mt: '1rem',
        },
      }}
    >
      <Flex
        onClick={toggle}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'baseline',
          cursor: 'pointer',
        }}
      >
        <Flex sx={{ alignItems: 'center', mr: '0.5rem' }}>
          <Box sx={{ color: 'grey.800', flex: '0 0 auto' }}>
            <Caret size="1.5rem" />
          </Box>
          <Text sx={{ flex: '1 1 auto' }}>{label}</Text>
        </Flex>
        <Text
          sx={{ fontSize: '0.8rem', color: 'grey.700', textAlign: 'right' }}
        >
          {formatNumber(acres)} acres
        </Text>
      </Flex>

      <Box sx={{ ml: '1.5rem' }}>
        {position > 0 && (
          <Box
            onClick={toggle}
            sx={{
              bg: color,
              width: `${position}%`,
              height: '0.75rem',
              lineHeight: 1,
              borderRadius: '0 0.5rem 0.5rem 0',
              pt: '0.25rem',
              px: '1rem',
              mb: '0.5rem',
              cursor: 'pointer',
            }}
          />
        )}
        {isOpen && (
          <Text variant="help">
            {description}

            {link && (
              <>
                <br />
                <OutboundLink from="/details" to={link}>
                  More information.
                </OutboundLink>
              </>
            )}
          </Text>
        )}
      </Box>
    </Box>
  )
}

BioticListItem.propTypes = {
  type: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
  maxAcres: PropTypes.number.isRequired,
}

export default BioticListItem

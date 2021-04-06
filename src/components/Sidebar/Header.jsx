import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Flex } from 'theme-ui'
import { SlidersH, Binoculars } from '@emotion-icons/fa-solid'

const Header = ({ icon, title }) => {
  const Icon = icon === 'compare' ? SlidersH : Binoculars
  return (
    <Flex
      sx={{
        alignItems: 'center',
        flexWrap: 'nowrap',
        lineHeight: 1,
        pt: '1rem',
        pb: '0.25rem',
        px: '1rem',
      }}
    >
      <Box
        sx={{
          color: 'grey.600',
          fontSize: ['1.5rem', '1.75rem'],
          mr: '0.5rem',
        }}
      >
        <Icon size="1em" />
      </Box>
      <Heading
        as="h2"
        sx={{
          fontSize: ['1.5rem', '1.75rem'],
          fontWeight: 'normal',
          color: 'grey.900',
          mb: 0,
        }}
      >
        {title}
      </Heading>
    </Flex>
  )
}

Header.propTypes = {
  icon: PropTypes.string.isRequired, // 'compare' or 'explore'
  title: PropTypes.string.isRequired,
}

export default Header

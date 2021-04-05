import React from 'react'
import PropTypes from 'prop-types'
import { Text, Image, Flex, Box, Heading } from 'theme-ui'
import { SlidersH, Binoculars } from '@emotion-icons/fa-solid'

import { Link } from 'components/Link'
import { hasWindow } from 'util/dom'

import SiteLogo from 'images/pmep_logo_color.svg'

const Header = ({ siteTitle }) => {
  const path = hasWindow && window.location ? window.location.pathname : null

  return (
    <Flex
      as="header"
      sx={{
        lineHeight: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: '0 0 auto',
        py: '0.75rem',
        px: '0.5rem',
        borderBottom: '1px solid',
        borderBottomColor: 'colors.grey.900',
        'a, a:visited': {
          color: 'primary.500',
        },
      }}
    >
      <Box
        sx={{
          flex: '1 0 auto',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Flex alignItems="center" flexWrap="wrap">
            <Image
              src={SiteLogo}
              sx={{
                width: '3rem',
                height: '3rem',
                my: '-0.5rem',
                mr: '0.25rem',
              }}
            />
            <Heading
              as="h1"
              sx={{
                fontSize: ['1.5rem', '1.5rem', '1.75rem'],
                fontWeight: 'normal',
                color: 'primary.500',
              }}
            >
              {siteTitle}
            </Heading>
          </Flex>
        </Link>
      </Box>

      <Heading as="h2" sx={{ fontSize: ['1.25rem'], fontWeight: 'normal' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Link to="/compare">
            <Flex
              sx={{
                alignItems: 'center',
                px: ['0.5em', '0.5rem', '1rem'],
                textDecoration: path === '/compare' ? 'underline' : 'inherit',
              }}
            >
              <SlidersH
                size="1.25rem"
                style={{ marginRight: '0.5rem', opacity: 0.6 }}
              />

              <Text>Compare</Text>
            </Flex>
          </Link>
          <Link to="/explore">
            <Flex
              sx={{
                alignItems: 'center',
                px: ['0.5em', '0.5rem', '1rem'],
                textDecoration: path === '/explore' ? 'underline' : 'inherit',
              }}
            >
              <Binoculars
                size="1.25rem"
                style={{ marginRight: '0.5rem', opacity: 0.6 }}
              />
              <Text>Explore</Text>
            </Flex>
          </Link>
        </Flex>
      </Heading>
    </Flex>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Header

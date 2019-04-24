import React from 'react'
import PropTypes from 'prop-types'
import { Text, Image } from 'rebass'
import { FaSlidersH, FaBinoculars } from 'react-icons/fa'

import { Link } from 'components/Link'

import { Flex } from 'components/Grid'
import styled, { themeGet } from 'util/style'

import SiteLogo from 'images/logo.svg'

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  background-color: ${themeGet('colors.primary.900')};
  padding: 0;
  flex: 0 0 auto;
`

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  flex-grow: 1;

  & * {
    color: #fff;
    text-decoration: none;
  }
`

const Logo = styled(Image).attrs({
  src: SiteLogo,
  as: 'img',
  width: ['2rem'],
  my: '-0.5rem',
  mr: '0.25rem',
  ml: '0.5rem',
})``

const NavLink = styled(Link)`
  color: #fff !important;
  text-decoration: none;
  font-weight: 100;
  padding: 0.5em 1em;

  &:hover {
    background-color: ${themeGet('colors.primary.500')};
  }
`

const CompareIcon = styled(FaSlidersH)`
  color: ${themeGet('colors.grey.100')};
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
`

const ExploreIcon = styled(FaBinoculars)`
  color: ${themeGet('colors.grey.100')};
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
`

const Header = ({ siteTitle }) => (
  <Wrapper as="header">
    <Title>
      <Link to="/">
        <Flex alignItems="center" flexWrap="wrap">
          <Logo />
          <Text fontSize={['1.25rem']}>{siteTitle}</Text>
        </Flex>
      </Link>
    </Title>
    <Flex>
      <NavLink to="/compare">
        <Flex alignItems="center">
          <CompareIcon />
          <div>Compare</div>
        </Flex>
      </NavLink>
      <NavLink to="/explore">
        <Flex alignItems="center">
          <ExploreIcon />
          Explore
        </Flex>
      </NavLink>
    </Flex>
  </Wrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default Header

import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'
import { FaSlidersH, FaBinoculars } from 'react-icons/fa'

import { Link } from 'components/Link'

import { Flex } from 'components/Grid'
import styled, { themeGet } from 'util/style'

import LogoImage from 'images/logo.png'

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'space-between',
})`
  background-color: ${themeGet('colors.primary.600')};
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

const SiteLogo = styled.img.attrs({
  src: LogoImage,
})`
  border: 2px solid #fff;
  border-radius: 20px;
  background: #fff;
  height: 30px;
  box-shadow: 0 0 6px #ffffffad;
  margin: 0 0.5em 0 0.5em;
`

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
          <SiteLogo />
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

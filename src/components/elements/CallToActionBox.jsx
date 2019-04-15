import React from 'react'
import PropTypes from 'prop-types'

import { Box, Flex } from 'components/Grid'
import { Link } from 'components/Link'
import FaIcon from 'components/elements/FaIcon'
import styled, { themeGet } from 'util/style'

const Wrapper = styled(Box).attrs({
  px: '1rem',
  py: '1rem',
  mx: '0.5rem',
})`
  background-color: ${themeGet('colors.grey.100')};
  border-radius: 0.25rem;
`

const Header = styled(Flex).attrs({
  alignItems: 'center',
  flexWrap: 'nowrap',
})`
  margin-bottom: 1rem;
`

const Title = styled.h3`
  flex: 0 0 auto;
  color: ${themeGet('colors.grey.900')} !important;
  font-size: 1.5em;
  font-weight: normal;
  margin-bottom: 0;
`

const StyledIcon = styled(FaIcon).attrs({
  size: '2rem',
})`
  width: 2rem;
  height: 2rem;
  margin-right: 1em;
  color: ${themeGet('colors.grey.800')};
`

const Content = styled.div`
  line-height: 1.2;
  color: ${themeGet('colors.grey.800')};
`

const LinkWrapper = styled.div`
  text-align: center;
  font-size: 1.1em;
  margin-top: 0.5em;
`

const CallToActionBox = ({
  icon,
  title,
  children,
  link,
  linkLabel,
  ...props
}) => (
  <Wrapper {...props}>
    <Header>
      <StyledIcon name={icon} />
      <Title>{title}</Title>
    </Header>

    <Content>{children}</Content>

    <LinkWrapper>
      <Link to={link}>{linkLabel}</Link>
    </LinkWrapper>
  </Wrapper>
)

CallToActionBox.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
}

export default CallToActionBox

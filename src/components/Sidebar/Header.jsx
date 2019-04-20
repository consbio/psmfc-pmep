import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

import { Flex } from 'components/Grid'
import FaIcon from 'components/elements/FaIcon'
import styled, { themeGet } from 'util/style'

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  flexWrap: 'nowrap',
})`
  line-height: 1;
  padding: 1rem 1rem 0.25rem;
`

const Icon = styled(FaIcon).attrs({})`
  margin-right: 0.25em;
  color: ${themeGet('colors.grey.800')};
`

const Title = styled(Text).attrs({
  fontSize: ['1.5rem', '1.75rem'],
})`
  margin: 0;
`

const Header = ({ icon, title }) => (
  <Wrapper>
    <Text fontSize={['1.5rem', '1.75rem']}>
      <Icon name={icon} />
    </Text>
    <Title>{title}</Title>
  </Wrapper>
)

Header.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header

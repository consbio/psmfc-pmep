import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

import { Box, Flex } from 'components/Grid'
import FaIcon from 'components/elements/FaIcon'
import styled, { themeGet } from 'util/style'

const Wrapper = styled(Box).attrs({
  width: ['100%', '350px', '470px'],
  flex: '0 0 auto',
})`
  border-right: 1px solid ${themeGet('colors.grey.800')};
  height: 100%;
`

const InnerWrapper = styled(Flex).attrs({
  flexDirection: 'column',
  flex: '1 1 auto',
})`
  overflow-y: hidden; // handle this instead in inner components
  overflow-x: hidden;
  height: 100%;
`

const Header = styled(Flex).attrs({
  alignItems: 'center',
  flexWrap: 'nowrap',
})`
  line-height: 1;
  padding: 1rem;
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

const Sidebar = ({ icon, title, children }) => (
  <Wrapper>
    <InnerWrapper>
      <Header>
        <Text fontSize={['1.5rem', '1.75rem']}>
          <Icon name={icon} />
        </Text>
        <Title>{title}</Title>
      </Header>
      {children}
    </InnerWrapper>
  </Wrapper>
)

Sidebar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Sidebar

import React from 'react'
import PropTypes from 'prop-types'

import { Box, Flex } from 'components/Grid'
import HelpText from 'components/elements/HelpText'
import styled, { themeGet } from 'util/style'
import Header from './Header'

export { Header as SidebarHeader }

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
  overflow-x: hidden;
  overflow-y: ${({ allowScroll }) => (allowScroll ? 'auto' : 'hidden')};
  height: 100%;
`

export const SidebarHelp = styled(HelpText).attrs({ mb: '1rem', px: '1rem' })`
  font-size: 0.8rem;
`

const Sidebar = ({ children, allowScroll }) => (
  <Wrapper>
    <InnerWrapper allowScroll={allowScroll}>{children}</InnerWrapper>
  </Wrapper>
)

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  allowScroll: PropTypes.bool,
}

Sidebar.defaultProps = {
  allowScroll: true,
}

export default Sidebar

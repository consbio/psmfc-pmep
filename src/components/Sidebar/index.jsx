import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'theme-ui'

import SidebarHeader from './Header'

export { SidebarHeader }

const Sidebar = ({ children, allowScroll }) => (
  <Box
    sx={{
      width: ['100%', '350px', '470px'],
      flex: '0 0 auto',
      height: '100%',
      borderRightColor: 'grey.800',
    }}
  >
    <Flex
      sx={{
        flexDirection: 'column',
        flex: '1 1 auto',
        height: '100%',
        overflowX: 'hidden',
        overflowY: allowScroll ? 'auto' : 'hidden',
      }}
      allowScroll={allowScroll}
    >
      {children}
    </Flex>
  </Box>
)

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  allowScroll: PropTypes.bool,
}

Sidebar.defaultProps = {
  allowScroll: true,
}

export default Sidebar

import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'

const Tab = ({ children }) => (
  <Box
    sx={{
      flex: '1 1 auto',
      overflowY: 'auto',
      height: '100%',
      pt: '1rem',
      px: '1rem',
      pb: '2rem',
    }}
  >
    {children}
  </Box>
)

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
}

export default Tab

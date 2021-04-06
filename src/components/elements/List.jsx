import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'theme-ui'

const List = ({ children, sx }) => (
  <Box
    as="ul"
    sx={{
      m: '0 0 0 1.25rem',
      p: 0,
      'ul li': {
        margin: 0,
      },
      ...sx,
    }}
  >
    {children}
  </Box>
)

List.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  sx: PropTypes.object,
}

List.defaultProps = {
  sx: {},
}

export default List

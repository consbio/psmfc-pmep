import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'theme-ui'

const linkCSS = {
  display: 'inline-block',
  color: 'primary.500',
  cursor: 'pointer',
  '&:hover': {
    TextDecoration: 'underline',
  },
}

const ExpandableParagraph = ({ snippet, children, sx }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }
  return (
    <Box onClick={toggle} sx={{ cursor: 'pointer', lineHeight: 1.2, ...sx }}>
      {isOpen ? (
        <div>
          {children}
          <br />
          <Text as="span" sx={linkCSS}>
            Show less...
          </Text>
        </div>
      ) : (
        <div>
          {snippet}{' '}
          <Text as="span" sx={linkCSS}>
            Show more...
          </Text>
        </div>
      )}
    </Box>
  )
}

ExpandableParagraph.propTypes = {
  snippet: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
  sx: PropTypes.object,
}

ExpandableParagraph.defaultProps = {
  sx: {},
}

export default ExpandableParagraph

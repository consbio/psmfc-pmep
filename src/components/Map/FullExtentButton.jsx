import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'theme-ui'
import { ExternalLinkSquareAlt } from '@emotion-icons/fa-solid'

const FullExtentButton = ({ onClick }) => (
  <Flex
    onClick={onClick}
    title="Zoom to full extent"
    sx={{
      cursor: 'pointer',
      position: 'absolute',
      right: '8px',
      top: '110px',
      width: '34px',
      height: '34px',
      zIndex: 999,
      bg: '#FFF',
      borderRadius: '5px',
      border: '2px solid rgb(216,216,216)',
    }}
  >
    <ExternalLinkSquareAlt size="1em" />
  </Flex>
)

FullExtentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default FullExtentButton

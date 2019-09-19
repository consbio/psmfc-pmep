import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { Flex } from 'components/Grid'
import styled from 'util/style'

const Wrapper = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'center',
})`
  cursor: pointer;
  position: absolute;
  right: 8px;
  top: 110px;
  width: 34px;
  height: 34px;
  z-index: 10000;
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid rgb(216, 216, 216);
`

const Icon = styled(FaExternalLinkAlt)`
  width: 1em;
  height: 1em;
`

const FullExtentButton = ({ onClick }) => (
  <Wrapper onClick={onClick} title="Zoom to full extent">
    <Icon />
  </Wrapper>
)

FullExtentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default FullExtentButton

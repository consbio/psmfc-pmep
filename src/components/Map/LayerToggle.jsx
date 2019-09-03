import React from 'react'
import PropTypes from 'prop-types'

import { Flex } from 'components/Grid'
import { ToggleButton } from 'components/Button'

import styled from 'util/style'

const Wrapper = styled(Flex).attrs({ alignItems: 'center', p: '0.5rem' })`
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 1000;
  background: #fff;
  border-radius: 0 0 0.25rem 0.25rem;
  box-shadow: 1px 1px 8px #333;
`

const TopBarToggle = styled(ToggleButton)`
  margin: 0 1rem;

  button {
    text-transform: lowercase;
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }
`

const LayerToggle = ({ value, options, onChange }) => (
  <Wrapper>
    Show:
    <TopBarToggle value={value} options={options} onChange={onChange} />
  </Wrapper>
)

LayerToggle.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default LayerToggle

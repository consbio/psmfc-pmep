import React from 'react'
import PropTypes from 'prop-types'

import HelpText from 'components/elements/HelpText'
import styled, { themeGet } from 'util/style'
import riverine from 'images/riverine.svg'
import delta from 'images/delta.svg'
import lagoonal from 'images/lagoonal.svg'
import bay from 'images/bay.svg'
import { estuaryTypes } from '../../../config/constants'

const Graphic = styled.img`
  border: 1px solid ${themeGet('colors.grey.400')};
  margin: 0;
`
// in same order as estuaryType in constants
const graphics = {
  0: bay,
  1: delta,
  2: riverine,
  3: lagoonal,
}

const EstuaryType = ({ type }) => {
  const graphic = graphics[type]

  return (
    <>
      {graphic && <Graphic alt="Estuary type graphic" src={graphic} />}

      <HelpText>{estuaryTypes[type].description}</HelpText>
    </>
  )
}

EstuaryType.propTypes = {
  type: PropTypes.number.isRequired,
}

export default EstuaryType

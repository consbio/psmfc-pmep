import React from 'react'
import PropTypes from 'prop-types'
import { Text, Image } from 'theme-ui'

import riverine from 'images/riverine.svg'
import delta from 'images/delta.svg'
import lagoonal from 'images/lagoonal.svg'
import bay from 'images/bay.svg'
import { estuaryTypes } from '../../../config/constants'

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
      {graphic && (
        <Image
          alt="Estuary type graphic"
          src={graphic}
          sx={{ border: '1px solid', borderColor: 'grey.400', margin: 0 }}
        />
      )}

      <Text variant="help">{estuaryTypes[type].description}</Text>
    </>
  )
}

EstuaryType.propTypes = {
  type: PropTypes.number.isRequired,
}

export default EstuaryType

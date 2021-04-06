import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'theme-ui'

import { nfhpCodes, nfhpLabels, nfhpColors } from '../../../config/constants'

const lowerBoundCSS = {
  borderLeft: '4px solid',
  borderLeftColor: 'primary.900',
  ml: '-4px',
  zIndex: 10,
}

const upperBoundCSS = {
  borderRight: '4px solid',
  borderRightColor: 'primary.900',
  mr: '-4px',
  position: 'relative',
  zIndex: 10,
  '&:after, &:before': {
    content: '" "',
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    border: '16px solid transparent',
    borderBottomColor: 'primary.900',
    height: 0,
    width: 0,
    ml: '-16px',
    pointerEvents: 'none',
  },
}

const activeCSS = {
  borderTop: '4px solid',
  borderTopColor: 'primary.900',
  borderBottom: '4px solid',
  borderBottomColor: 'primary.900',
  borderRadius: '0.5rem',
  height: '2rem',
}

const levels = nfhpCodes.slice(0, nfhpCodes.length - 1).reverse()

const getTextColor = (level) => {
  switch (level) {
    case 0:
    case 1:
    case 4: {
      return '#FFF'
    }
    default: {
      return 'text'
    }
  }
}

const ThreatChart = ({ level }) => (
  <Box sx={{ mx: [0, 0, '1rem'], my: '1rem' }}>
    <Box
      level={level}
      sx={{
        py: '0.5rem',
        px: '1rem',
        borderRadius: '0.5rem',
        mb: '1rem',
        textAlign: 'center',
        letterSpacing: '0.05em',
        fontWeight: 'bold',
        color: getTextColor(level),
        bg: nfhpColors[level],
      }}
    >
      {nfhpLabels[level]}
    </Box>

    <Flex sx={{ alignItems: 'center', mx: '0.5rem' }}>
      {levels.map((l) => (
        <Box
          key={l}
          sx={{
            flex: '1 0 auto',
            height: '1.5rem',
            bg: nfhpColors[l],
            ...(l === level ? lowerBoundCSS : {}),
            ...(l === level ? upperBoundCSS : {}),
            ...(l >= level && l <= level ? activeCSS : {}),
          }}
        />
      ))}
    </Flex>
    <Flex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'grey.700',
        fontSize: '0.7rem',
        mt: '0.25rem',
        mx: '0.5rem',
      }}
    >
      <div>lower threat</div>
      <div>higher threat</div>
    </Flex>
  </Box>
)

ThreatChart.propTypes = {
  level: PropTypes.number.isRequired,
}

export default ThreatChart

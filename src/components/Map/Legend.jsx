import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'theme-ui'

const Circle = ({ radius, color, borderColor, borderWidth, scale }) => {
  const width = 2 * borderWidth + 2 * radius * scale
  const center = width / 2

  return (
    <svg style={{ width, height: width }}>
      <circle
        cx={center}
        cy={center}
        r={radius * scale}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
    </svg>
  )
}

Circle.propTypes = {
  radius: PropTypes.number.isRequired,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  scale: PropTypes.number,
}

Circle.defaultProps = {
  borderWidth: 0,
  color: null,
  borderColor: null,
  scale: 1,
}

const Entry = ({ type, label, color, borderWidth, borderColor, radius }) => (
  <Flex
    sx={{
      alignItems: 'center',
      '&:not(:first-of-type)': {
        mt: '0.25rem',
      },
    }}
  >
    {type === 'circle' ? (
      <Circle
        scale={0.5}
        color={color}
        borderWidth={borderWidth}
        borderColor={borderColor}
        radius={radius}
      />
    ) : (
      <Box
        sx={{
          flex: '0 0 1.25rem',
          width: '1.25rem',
          height: '1.25rem',
          bg: color || 'transparent',
          borderStyle: 'solid',
          borderColor: borderColor || 'transparent',
          borderWidth: `${borderWidth || 0}px`,
          borderRadius: '0.25rem',
        }}
      />
    )}
    <Text sx={{ fontSize: '0.7rem', color: 'grey.800', ml: '0.5rem' }}>
      {label}
    </Text>
  </Flex>
)

Entry.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  radius: PropTypes.number,
}

Entry.defaultProps = {
  color: null,
  borderColor: null,
  borderWidth: 0,
  radius: 0,
}

const Legend = ({ title, entries }) => {
  if (!entries.length) return null

  const [isClosed, setIsClosed] = useState(false)
  const toggle = () => setIsClosed((prevIsClosed) => !prevIsClosed)

  const cols = []

  return (
    <Box
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        right: '10px',
        bottom: '24px',
        zIndex: 10000,
        bg: '#FFF',
        borderRadius: '0.5rem',
        border: '1px solid',
        borderColor: 'grey.400',
        boxShadow: '1px 1px 4px #666',
        p: '0.25rem 0.5rem 0.5rem',
        maxHeight: '90%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
      title={isClosed ? 'click to open' : 'click to hide'}
      onClick={toggle}
    >
      {isClosed ? (
        <Text sx={{ fontSize: ['0.8rem', '0.8rem', '1rem'] }}>{title}</Text>
      ) : (
        <Flex sx={{ alignItems: 'center' }}>
          {cols.length ? (
            <>
              {cols.map((colEntries, i) => (
                <Box key={i}>
                  {colEntries.map((entry) => (
                    <Entry key={entry.label} {...entry} />
                  ))}
                </Box>
              ))}
            </>
          ) : (
            <Box>
              {entries.map((entry) => (
                <Entry key={entry.label} {...entry} />
              ))}
            </Box>
          )}
        </Flex>
      )}
    </Box>
  )
}

Legend.propTypes = {
  title: PropTypes.string,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string,
      borderColor: PropTypes.string,
      borderWidth: PropTypes.number,
      radius: PropTypes.number,
    })
  ),
}

Legend.defaultProps = {
  title: 'Legend',
  entries: [],
}

export default Legend

// derived from: https://codepen.io/zeroskillz/pen/mPmENy

import React from 'react'
import PropTypes from 'prop-types'

import styled, { theme } from 'util/style'

const Circle = styled.circle`
  fill: transparent;
  transition: stroke-dasharray 0.5s;
`

const calculateRotation = (halfsize, offset) =>
  `rotate(${(offset / 100) * 360 - 90} ${halfsize},${halfsize})`

const Donut = ({ entries, backgroundColor, size, donutWidth, ...props }) => {
  const halfsize = size * 0.5
  const radius = halfsize - donutWidth * 0.5
  const circumference = 2 * Math.PI * radius

  const offsets = entries.reduce(
    (prev, { percent }) => prev.concat([percent + prev[prev.length - 1]]),
    [0]
  )

  return (
    <svg width={`${size}px`} height={`${size}px`} {...props}>
      <Circle
        r={radius}
        cx={halfsize}
        cy={halfsize}
        stroke={backgroundColor}
        strokeWidth={donutWidth}
      />

      {entries.map(({ percent, color }, i) => (
        <Circle
          key={offsets[i]}
          r={radius}
          cx={halfsize}
          cy={halfsize}
          transform={calculateRotation(halfsize, offsets[i])}
          stroke={color}
          strokeWidth={donutWidth}
          strokeDasharray={`${(percent * circumference) /
            100} ${circumference}`}
        />
      ))}
    </svg>
  )
}

Donut.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      percent: PropTypes.number.isRequired, // percent, preferably integer
      color: PropTypes.string, // color of the indicator on the donut
    })
  ).isRequired,

  donutWidth: PropTypes.number, // width of donut

  backgroundColor: PropTypes.string,
  size: PropTypes.number, // width of the chart
  offset: PropTypes.number, // additional percentage to rotate the indicator (e.g., sum of percents of preceding charts in a series)
  active: PropTypes.bool,
}

Donut.defaultProps = {
  donutWidth: 26,
  backgroundColor: theme.colors.grey[200],
  size: 200,
  offset: 0,
  active: false,
}

export default Donut

// derived from: https://codepen.io/zeroskillz/pen/mPmENy

import React from 'react'
import PropTypes from 'prop-types'

import styled, { theme, themeGet } from 'util/style'
import { formatNumber } from 'util/format'

const Circle = styled.circle`
  fill: transparent;
  transition: stroke-dasharray 0.5s;
`

const PercentLabel = styled.tspan`
  font-size: ${({ fontSize }) => fontSize}px;
  fill: ${themeGet('colors.grey.900')};
  font-weight: bold;
`

const Percent = styled.tspan`
  font-size: ${({ fontSize }) => fontSize}px;
  fill: ${themeGet('colors.grey.900')};
`

const Label = styled.tspan`
  font-size: ${({ fontSize }) => fontSize}px;
  fill: ${themeGet('colors.grey.900')};
  text-shadow: 0px 0px 2px #fff;
`

const Donut = ({
  percent,
  percentLabel,
  percentSize,
  label,
  color,
  backgroundColor,
  size,
  donutWidth,
  offset,
  active,
  ...props
}) => {
  const halfsize = size * 0.5
  const radius = halfsize - donutWidth * 0.5
  const circumference = 2 * Math.PI * radius
  const rotateval = `rotate(${(offset / 100) * 365 -
    90} ${halfsize},${halfsize})`

  return (
    <svg width={`${size}px`} height={`${size}px`} {...props}>
      <Circle
        r={radius}
        cx={halfsize}
        cy={halfsize}
        stroke={backgroundColor}
        strokeWidth={donutWidth}
      />
      <Circle
        r={radius}
        cx={halfsize}
        cy={halfsize}
        transform={rotateval}
        stroke={color}
        strokeWidth={donutWidth}
        strokeDasharray={`${(percent * circumference) / 100} ${circumference}`}
      />
      <text
        className="donutchart-text"
        x={halfsize}
        y={halfsize}
        style={{
          textAnchor: 'middle',
          dominantBaseline: label ? '' : 'central',
        }}
      >
        <PercentLabel isActive={active} percentSize={percentSize}>
          {percentLabel !== null
            ? percentLabel
            : formatNumber(percent, percent < 1 ? 1 : 0)}
        </PercentLabel>

        <Percent fontSize={percentSize * 0.6}>%</Percent>

        {label && (
          <Label
            x={halfsize}
            y={halfsize + percentSize * 0.65}
            fontSize={percentSize * 0.5}
          >
            {label}
          </Label>
        )}
      </text>

      {active ? (
        <Circle
          r={halfsize - 2}
          cx={halfsize}
          cy={halfsize}
          stroke={theme.colors.primary[600]}
          strokeWidth={4}
        />
      ) : null}
    </svg>
  )
}

Donut.propTypes = {
  percent: PropTypes.number.isRequired, // percent, preferably integer
  percentLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentSize: PropTypes.number,
  label: PropTypes.string, // label placed below percent in middle of donut
  donutWidth: PropTypes.number, // width of donut
  color: PropTypes.string, // color of the indicator on the donut
  backgroundColor: PropTypes.string,
  size: PropTypes.number, // width of the chart
  offset: PropTypes.number, // additional percentage to rotate the indicator (e.g., sum of percents of preceding charts in a series)
  active: PropTypes.bool,
}

Donut.defaultProps = {
  percentLabel: null,
  label: null,
  donutWidth: 26,
  color: theme.colors.primary[300],
  backgroundColor: theme.colors.grey[200],
  size: 200,
  percentSize: 30,
  offset: 0,
  active: false,
}

export default Donut

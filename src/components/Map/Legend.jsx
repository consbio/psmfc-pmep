import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

import { Flex, Box } from 'components/Grid'

import styled, { themeGet } from 'util/style'

const Wrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 24px;
  z-index: 10000;
  background-color: #fff;
  border-radius: 0.5rem;
  border: 1px solid ${themeGet('colors.grey.400')};
  box-shadow: 1px 1px 4px #666;
  padding: 0.25rem 0.5rem 0.5rem;
`

const Title = styled(Text).attrs({
  fontSize: ['0.8rem', '0.8rem', '1rem'],
})``

const Entry = styled(Flex).attrs({
  alignItems: 'center',
})`
  &:not(:first-child) {
    margin-top: 0.25rem;
  }
`

const Patch = styled(Box).attrs({
  flex: 0,
})`
  flex: 0 0 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${({ color }) => color || 'transparent'};
  border-style: solid;
  border-width: ${({ borderWidth }) => borderWidth || 0}px;
  border-color: ${({ borderColor }) => borderColor || 'transparent'};
  border-radius: 0.25rem;
`

const Label = styled(Box).attrs({})`
  font-size: 0.8rem;
  color: ${themeGet('colors.grey.800')};
  margin-left: 0.5rem;
`

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

const Legend = ({ title, entries }) => {
  if (!entries.length) return null

  const [closed, setClosed] = useState(false)
  const toggle = () => setClosed(isClosed => !isClosed)

  return (
    <Wrapper onClick={toggle}>
      <Title>{title}</Title>
      {!closed && (
        <div>
          {entries.map(({ type, label, ...entry }) => (
            <Entry key={label}>
              {type === 'circle' ? (
                <Circle scale={0.5} {...entry} />
              ) : (
                <Patch {...entry} />
              )}
              <Label>{label}</Label>
            </Entry>
          ))}
        </div>
      )}
    </Wrapper>
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

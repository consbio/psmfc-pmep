import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'

import { Box, Flex } from 'components/Grid'
import styled, { theme, themeGet } from 'util/style'
import { nfhpCodes, nfhpLabels, nfhpColors } from '../../../config/constants'

const Wrapper = styled(Box).attrs({ mx: [0, 0, '1rem'], my: '1rem' })``

const Header = styled.div`
  padding: 0.5em 1em;
  border-radius: 0.5em;
  margin-bottom: 1em;

  text-align: center;
  letter-spacing: 0.05em;
  font-weight: bold;
  color: ${({ level }) => (level < 3 ? '#FFF' : themeGet('colors.black'))};
  background-color: ${({ level }) => nfhpColors[level]};
`

const Labels = styled(Flex)`
  margin-top: 0.25em;
  font-size: 0.7em;
  color: ${themeGet('colors.grey.700')};
`

const ItemContainer = styled(Flex)`
  margin: 0 0.5em;
`

const borderColor = theme.colors.primary[900]

const borderRadius = (isLower, isUpper) => {
  if (!(isLower || isUpper)) return '0'

  if (isLower && isUpper) {
    return '0.5em'
  }
  return isLower ? '0.5em 0 0 0.5em' : '0 0.5em 0.5em 0'
}

const Level = styled.div`
    flex: 1 0 auto;
    height: ${({ isActive }) => (isActive ? '2rem' : '1.5em')};
    background-color: ${({ color }) => color};
    border-radius: ${({ isLower, isUpper }) => borderRadius(isLower, isUpper)};
    z-index: ${({ isLower, isUpper }) => (isLower || isUpper ? 10 : 0)};

    ${({ isLower }) =>
      isLower &&
      css`
        border-left: 4px solid ${borderColor}};
        margin-left: -4px;
      `}

    ${({ isUpper }) =>
      isUpper &&
      css`
        border-right: 4px solid ${borderColor}};
        margin-right: -4px;
        position: relative;

        &:after,
        &:before {
          bottom: 100%;
          left: 50%;
          border: solid transparent;
          content: ' ';
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
        }

        &:after {
          border-color: transparent;
          border-bottom-color: ${borderColor};
          border-width: 16px;
          margin-left: -16px;
        }
        &:before {
          border-color: transparent;
          border-bottom-color: ${borderColor};
          border-width: 16px;
          margin-left: -16px;
        }
      `}

    ${({ isActive }) =>
      isActive &&
      css`
        border-top: 4px solid ${borderColor};
        border-bottom: 4px solid ${borderColor};
      `}
`

const levels = nfhpCodes.slice(0, nfhpCodes.length - 1).reverse()

const ThreatChart = ({ level }) => (
  <Wrapper>
    <Header level={level}>{nfhpLabels[level]}</Header>
    <ItemContainer alignItems="center">
      {levels.map(l => (
        <Level
          key={l}
          color={nfhpColors[l]}
          isActive={l >= level && l <= level}
          isLower={l === level}
          isUpper={l === level}
        />
      ))}
    </ItemContainer>
    <Labels justifyContent="space-between" alignItems="center">
      <div>lower threat</div>
      <div>higher threat</div>
    </Labels>
  </Wrapper>
)

ThreatChart.propTypes = {
  level: PropTypes.number.isRequired,
}

export default ThreatChart

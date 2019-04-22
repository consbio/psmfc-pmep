import React from 'react'
import PropTypes from 'prop-types'

import { Flex } from 'components/Grid'
import styled, { themeGet } from 'util/style'
import { formatNumber } from 'util/format'
import { bioticInfo } from '../../../config/constants'

const Wrapper = styled.div`
  margin-bottom: 1rem;
`

const Title = styled.div``

const Bar = styled.div`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width * 100}%;
  height: 1.25rem;
  line-height: 1;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 0.25rem 1rem 0;
  box-sizing: border-box;
`

const Label = styled.div`
  font-size: 0.75rem;
  margin-left: 0.5rem;
  color: ${themeGet('colors.grey.700')};
`

const InnerLabel = styled(Label)`
  margin-left: 0;
  color: #fff;
  text-shadow: 1px 1px 3px #666;
  text-align: right;
`

const Description = styled.p`
  line-height: 1.2;
  font-size: 0.8rem;
  color: ${themeGet('colors.grey.600')};
  margin: 0.5rem 0 0 1rem;
`

const BioticListItem = ({ type, acres, maxAcres }) => {
  const { label, color, description } = bioticInfo[type]
  const position = acres / maxAcres
  return (
    <Wrapper>
      <Title>{label}</Title>
      <Flex alignItems="center">
        {position > 0.75 ? (
          <Bar color={color} width={position}>
            <InnerLabel>{formatNumber(acres)} acres</InnerLabel>
          </Bar>
        ) : (
          <>
            {position > 0 && <Bar color={color} width={position} />}
            <Label>{formatNumber(acres)} acres</Label>
          </>
        )}
      </Flex>

      <Description>{description}</Description>
    </Wrapper>
  )
}

BioticListItem.propTypes = {
  type: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
  maxAcres: PropTypes.number.isRequired,
}

export default BioticListItem

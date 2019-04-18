import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

import { Flex, Box } from 'components/Grid'

import styled, { themeGet } from 'util/style'

const Wrapper = styled.div`
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

const Patch = styled(Box).attrs({
  flex: 0,
})``

const Label = styled(Box).attrs({})``

const Legend = ({ title, entries }) => (
  <Wrapper>
    <Title>{title}</Title>
    {entries.map(({ label }) => (
      <Flex>
        <Patch>TODO: patch</Patch>
        <Label>{label}</Label>
      </Flex>
    ))}
  </Wrapper>
)

Legend.propTypes = {
  title: PropTypes.string,
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

Legend.defaultProps = {
  title: 'Legend',
}

export default Legend

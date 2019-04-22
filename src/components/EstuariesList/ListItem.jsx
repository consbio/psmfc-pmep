import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

import { Columns, Column } from 'components/Grid'
import styled, { themeGet, theme } from 'util/style'
import { formatNumber } from 'util/format'
import { stateNames } from '../../../config/constants'

const Wrapper = styled(Text).attrs({
  fontSize: ['0.9rem', '0.8rem', '0.9rem'],
})`
  line-height: 1.2;
  padding: 0.5rem 1rem;
  cursor: pointer;

  color: ${themeGet('colors.grey.600')};
  font-weight: 100;

  &:hover {
    background-color: ${theme.colors.primary[100]}50;
  }

  &:not(:first-child) {
    border-top: 1px solid ${themeGet('colors.grey.100')};
    padding-top: 0.5rem;
  }
`

const Name = styled.div`
  color: ${themeGet('colors.primary.500')};
  font-size: 1rem;
  font-weight: normal;
`

const ListItem = ({ name, type, state, acres, ...props }) => (
  <Wrapper {...props}>
    <Columns>
      <Column>
        <Name>{name}</Name>
        {stateNames[state] || ''}
      </Column>
      <Column>
        <Text textAlign="right">
          {type}
          <br />({formatNumber(acres, 0)} acres)
        </Text>
      </Column>
    </Columns>
  </Wrapper>
)

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
}

// only rerender on ID change
export default memo(
  ListItem,
  ({ id: prevID }, { id: nextID }) => nextID === prevID
)

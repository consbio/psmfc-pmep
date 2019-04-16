import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

import { Columns, Column } from 'components/Grid'
import styled, { themeGet, theme } from 'util/style'
import { formatNumber } from 'util/format'
import { stateNames } from '../../../config/constants'

const Wrapper = styled.li`
  margin: 0 -1rem;
  padding: 0 1rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.primary[100]}50;
  }

  &:not(:first-child) {
    border-top: 1px solid ${themeGet('colors.grey.100')};
    padding-top: 0.5rem;
  }
`

const Name = styled(Text)`
  color: ${themeGet('colors.link')};
`

const Info = styled(Text).attrs({
  fontSize: ['0.8rem', '0.9rem'],
})`
  color: ${themeGet('colors.grey.600')};
  font-weight: 100;
`

const RightInfo = styled(Info).attrs({ textAlign: ['left', 'right'] })``

const ListItem = ({ id, name, type, state, acres, ...props }) => (
  <Wrapper {...props}>
    <Columns>
      <Column>
        <Name>{name}</Name>
        <Info>{stateNames[state] || ''}</Info>
      </Column>

      <Column>
        <RightInfo>{type}</RightInfo>
        <RightInfo>({formatNumber(acres, 0)} acres)</RightInfo>
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
  onSelectID: PropTypes.func.isRequired,
}

export default ListItem

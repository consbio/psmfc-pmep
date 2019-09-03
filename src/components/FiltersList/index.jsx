import React, { useContext } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { Text } from 'rebass'

import { Context as Crossfilter, RESET_FILTERS } from 'components/Crossfilter'
import { Button } from 'components/Button'
import { Flex, Box, Columns, Column } from 'components/Grid'
import styled, { themeGet } from 'util/style'
import Filter from './Filter'
import { filters as rawFilters } from '../../../config/filters'

const Wrapper = styled(Flex).attrs({
  flexDirection: 'column',
  flex: 1,
})`
  height: 100%;
`

const Header = styled(Columns).attrs({
  flex: 0,
  px: '1rem',
  pb: '0.5rem',
})`
  border-bottom: 1px solid ${themeGet('colors.grey.200')};
`

export const Count = styled.span`
  color: ${themeGet('colors.grey.600')};
  font-size: 0.8em;
  line-height: 1.2;
`

const ResetButton = styled(Button).attrs({ secondary: true })`
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
`

const ResetButtonContents = styled(Flex).attrs({
  alignItems: 'center',
  justifyContent: 'flex-end',
})``

const ResetIcon = styled(FaRegTimesCircle).attrs({
  size: '1em',
})`
  margin-right: 0.25rem;
  cursor: pointer;
`

const Filters = styled(Box).attrs({ flex: 1, pr: '1rem' })`
  overflow-y: auto;
  height: 100%;
`

// filter out internal filters
const filters = rawFilters.filter(({ internal }) => !internal)

const index = () => {
  const { state, dispatch } = useContext(Crossfilter)

  const hasFilters =
    filters.filter(({ field }) => {
      const curFilter = state.get('filters').get(field)
      return curFilter && !curFilter.isEmpty()
    }).length > 0

  const handleReset = () => {
    dispatch({
      type: RESET_FILTERS,
      payload: {
        fields: filters.map(({ field }) => field),
      },
    })
  }

  return (
    <Wrapper>
      <Header alignItems="baseline">
        <Column>
          <Count>
            {state.get('filteredCount')} estuaries currently visible
          </Count>
        </Column>
        <Column>
          {hasFilters && (
            <Text textAlign="right">
              <ResetButton onClick={handleReset}>
                <ResetButtonContents>
                  <ResetIcon />
                  <div>reset all filters</div>
                </ResetButtonContents>
              </ResetButton>
            </Text>
          )}
        </Column>
      </Header>

      <Filters>
        {filters.map(filter => (
          <Filter key={filter.field} {...filter} />
        ))}
      </Filters>
    </Wrapper>
  )
}

export default index

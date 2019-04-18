import React, { useState, useContext } from 'react'
import { Map, Set } from 'immutable'
import { FaRegTimesCircle, FaCaretDown, FaCaretRight } from 'react-icons/fa'

import { Context as Crossfilter, SET_FILTER } from 'components/Crossfilter'
import { Flex } from 'components/Grid'

import styled, { theme, themeGet } from 'util/style'
import { formatNumber } from 'util/format'
import Bar from './Bar'

const Wrapper = styled.div`
  border-top: 1px solid ${themeGet('colors.grey.200')};
  padding-top: 0.25rem;
`

const Header = styled(Flex).attrs({
  justifyContent: 'space-between',
})``

const Title = styled(Flex).attrs({ alignItems: 'center' })`
  cursor: pointer;
`

const ResetIcon = styled(FaRegTimesCircle).attrs({
  size: '1rem',
})`
  margin-left: 1rem;
  visibility: ${({ visible }) => visible};
  cursor: pointer;
  color: ${themeGet('colors.highlight')};
`

const expandoColor = theme.colors.grey[800]
const expandoSize = '1.5rem'

const CaretDown = styled(FaCaretDown).attrs({
  color: expandoColor,
  size: expandoSize,
})`
  margin-right: 0.25rem;
`

const CaretRight = styled(FaCaretRight).attrs({
  color: expandoColor,
  size: expandoSize,
})`
  margin-right: 0.25rem;
`

const Filter = ({ field, label, values, help }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { state, dispatch } = useContext(Crossfilter)

  const filterValues = state.get('filters').get(field, Set()) // TODO: general default type
  const counts = state.get('dimensionCounts').get(field, Map())
  const total = state.get('total') // TODO: get the right number

  console.log('filter values', filterValues)

  const isFiltered = filterValues.size > 0 // TODO

  const toggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleFilterClick = value => {
    dispatch({
      type: SET_FILTER,
      payload: {
        field,
        // TODO: adapt to other types
        filterValue: filterValues.has(value)
          ? filterValues.delete(value)
          : filterValues.add(value),
      },
    })
  }

  const handleReset = () => {
    dispatch({
      type: SET_FILTER,
      payload: {
        field,
        filterValue: filterValues.clear(),
      },
    })
  }

  return (
    <Wrapper>
      <Header>
        <Title onClick={toggle}>
          {isOpen ? <CaretDown /> : <CaretRight />}
          <div>{label}</div>
        </Title>
        {
          <ResetIcon
            onClick={handleReset}
            visible={isFiltered ? 'visible' : 'hidden'}
          />
        }
      </Header>

      {isOpen && (
        <div>
          {values.map(value => (
            <Bar
              key={value}
              isFiltered={filterValues.has(value)}
              label={value}
              count={counts.get(value, 0)}
              total={total}
              onClick={() => handleFilterClick(value)}
            />
          ))}
        </div>
      )}
    </Wrapper>
  )
}

export default Filter

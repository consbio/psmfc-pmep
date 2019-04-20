import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { FixedSizeList as List } from 'react-window'
import useDimensions from 'react-use-dimensions'

import {
  Context as CrossfilterContext,
  SET_FILTER,
} from 'components/Crossfilter'
import { Box, Flex, Columns, Column } from 'components/Grid'
import styled, { themeGet } from 'util/style'
import SearchBar from './SearchBar'
import SortBar from './SortBar'
import ListItem from './ListItem'

const sortOptions = [
  {
    label: 'name',
    sortFunc: (a, b) => (a.get('name') > b.get('name') ? 1 : -1),
  },
  { label: 'size', sortFunc: (a, b) => b.get('acres') - a.get('acres') },
  { label: 'north to south', sortFunc: (a, b) => b.get('lat') - a.get('lat') },
]

export const Wrapper = styled(Flex).attrs({
  flex: '1 1 auto',
  flexDirection: 'column',
})``

export const Count = styled.span`
  color: ${themeGet('colors.grey.600')};
  font-size: 0.8em;
  line-height: 1.2;
`

export const ListWrapper = styled.div`
  flex: 1 1 auto;
`

export const NoResults = styled(Box)`
  color: ${themeGet('colors.grey.600')};
  margin-top: 2rem;
  text-align: center;
`

const EstuariesList = ({ onSelect }) => {
  console.log('render estuaries list')

  const { state, dispatch: filterDispatch } = useContext(CrossfilterContext)

  const listRef = useRef(null)
  const [listWrapperRef, { height: listHeight }] = useDimensions()
  const [query, setQuery] = useState('')
  const [sortIdx, setSortIdx] = useState(2) // default: north to south

  const handleQueryChange = value => {
    setQuery(value)

    filterDispatch({
      type: SET_FILTER,
      payload: {
        field: 'name',
        filterValue: value.toLowerCase(),
      },
    })
  }

  const handleSortChange = idx => {
    if (idx === sortIdx) return

    setSortIdx(idx)

    // reset list to top
    if (listRef.current) {
      listRef.current.scrollTo(0)
    }
  }

  const data = state.get('data')
  console.log('data in render list', data)
  const sortedData = data.sort(sortOptions[sortIdx].sortFunc)

  return (
    <Wrapper>
      <Columns px="1rem" alignItems="baseline">
        <Column>
          <Count>{data.size} currently visible</Count>
        </Column>
        <Column>
          <SortBar
            index={sortIdx}
            options={sortOptions}
            onChange={handleSortChange}
          />
        </Column>
      </Columns>

      <SearchBar
        value={query}
        placeholder="Enter an estuary name"
        onChange={handleQueryChange}
      />

      {data.size > 0 ? (
        <ListWrapper ref={listWrapperRef}>
          {listHeight ? (
            <List
              ref={listRef}
              itemData={sortedData.toJS()}
              height={listHeight}
              itemSize={64}
              itemCount={sortedData.size}
              itemKey={(i, items) => items[i].id}
            >
              {({ index, data: listData, style }) => {
                const item = listData[index]
                return (
                  <ListItem
                    onClick={() => onSelect(item.id)}
                    {...item}
                    style={style}
                  />
                )
              }}
            </List>
          ) : null}
        </ListWrapper>
      ) : (
        <NoResults>No visible estuaries...</NoResults>
      )}
    </Wrapper>
  )
}

EstuariesList.propTypes = {
  onSelect: PropTypes.func.isRequired,
}

export default EstuariesList

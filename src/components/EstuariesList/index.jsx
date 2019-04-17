import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'
import { Text } from 'rebass'
import { FixedSizeList as List } from 'react-window'
import useDimensions from 'react-use-dimensions'

import { Flex, Box, Columns, Column } from 'components/Grid'
import styled, { themeGet } from 'util/style'
import ListItem from './ListItem'

const sortOptions = [
  {
    label: 'name',
    sortFunc: (a, b) => (a.name > b.name ? 1 : -1),
  },
  { label: 'size', sortFunc: (a, b) => b.acres - a.acres },
  { label: 'north to south', sortFunc: (a, b) => b.lat - a.lat },
]

const Wrapper = styled(Flex).attrs({
  flex: '1 1 auto',
  flexDirection: 'column',
})``

const Count = styled(Column)`
  color: ${themeGet('colors.grey.600')};
  font-size: 0.8em;
  line-height: 1.2;
`

const SortOptions = styled(Column)`
  color: ${themeGet('colors.grey.600')};
  font-size: 0.8rem;
  padding: 0 1rem;
  line-height: 1.2;
`

const SortOption = styled.span`
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 0.5em;
    padding-left: 0.5em;
    border-left: 1px solid ${themeGet('colors.grey.400')};
  }
`
const ActiveSortOption = styled(SortOption)`
  color: ${themeGet('colors.secondary.500')};
  font-weight: bold;
`

const SearchBar = styled.div`
  background-color: ${themeGet('colors.grey.200')};
  padding: 0.5rem 1rem;
  margin-top: 0.25rem;
`

const SearchIcon = styled(FaSearch).attrs({
  size: '1.25rem',
})`
  color: ${themeGet('colors.grey.800')};
  margin-right: 0.5em;
`

const Input = styled.input`
  width: 100%;
  font-size: 0.8rem;
  outline: none;
  padding: 0.1em 0.5em;
  color: ${themeGet('colors.grey.600')};
  border-radius: 0.25rem;
  background: #fff;
  border: none;
`

const ListWrapper = styled.div`
  flex: 1 1 auto;
`

const NoResults = styled(Box)`
  color: ${themeGet('colors.grey.600')};
  margin-top: 2rem;
  text-align: center;
`

const EstuariesList = ({ data, onQueryChange, onSelect }) => {
  const listRef = useRef(null)
  const [listWrapperRef, { height: listHeight }] = useDimensions()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(2) // default: north to south

  const handleQueryChange = ({ target: { value } }) => {
    setQuery(value)
    // TODO: debounce
    onQueryChange(value.toLowerCase())
  }

  const handleSortChange = value => {
    setSort(value)
    listRef.current.scrollTo(0)
  }

  const sortedData = data.sort(sortOptions[sort].sortFunc)

  return (
    <Wrapper>
      <Columns px="1rem">
        <Count>{data.length} currently visible</Count>
        <SortOptions>
          <Text textAlign={['left', 'right']}>
            sort:&nbsp;
            {sortOptions.map(({ label }, idx) =>
              idx === sort ? (
                <ActiveSortOption key={label}>{label}</ActiveSortOption>
              ) : (
                <SortOption key={label} onClick={() => handleSortChange(idx)}>
                  {label}
                </SortOption>
              )
            )}
          </Text>
        </SortOptions>
      </Columns>

      <SearchBar>
        <Flex alignItems="center">
          <SearchIcon />
          <Input
            value={query}
            placeholder="Enter an estuary name"
            onChange={handleQueryChange}
          />
        </Flex>
      </SearchBar>

      {sortedData.length ? (
        <ListWrapper ref={listWrapperRef}>
          {listHeight ? (
            <List
              ref={listRef}
              itemData={sortedData}
              height={listHeight}
              itemSize={72}
              itemCount={sortedData.length}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      acres: PropTypes.number.isRequired,
    })
  ).isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default EstuariesList

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaSearch } from 'react-icons/fa'
import { Text } from 'rebass'

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

const Wrapper = styled.div``

const Count = styled(Column)`
  color: ${themeGet('colors.grey.600')};
  font-size: 0.8em;
`

const SortOptions = styled(Column)`
  color: ${themeGet('colors.grey.600')};
  font-size: 0.8rem;
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
  margin: 0 -1rem;
  background-color: ${themeGet('colors.grey.200')};
  padding: 0.25rem 1rem;
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

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const NoResults = styled(Box)`
  color: ${themeGet('colors.grey.600')};
  margin-top: 2rem;
`

const EstuariesList = ({ data, onQueryChange }) => {
  console.log('rerender estuaries list')

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(2) // default: north to south

  const handleQueryChange = ({ target: { value } }) => {
    setQuery(value)
    // TODO: debounce
    // onQueryChange(value)
  }

  //   const handleSortChange = (idx) => {
  //       setSort(sortOptions[idx])
  //   }

  // make light copy here so that sort doesn't alter original data
  const sortedData = data.slice().sort(sortOptions[sort].sortFunc)

  return (
    <Wrapper>
      <Columns>
        <Count>{data.length} currently visible</Count>
        <SortOptions>
          <Text textAlign={['left', 'right']}>
            sort:&nbsp;
            {sortOptions.map(({ label }, idx) =>
              idx === sort ? (
                <ActiveSortOption>{label}</ActiveSortOption>
              ) : (
                <SortOption onClick={() => setSort(idx)}>{label}</SortOption>
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
        <List>
          {sortedData.map(({ id, ...props }) => (
            <ListItem key={id} id={id} {...props} />
          ))}
        </List>
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
}

export default EstuariesList

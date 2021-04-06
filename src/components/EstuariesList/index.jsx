import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'theme-ui'
import { Map } from 'immutable'
import { FixedSizeList as List } from 'react-window'
import useDimensions from 'react-use-dimensions'

import {
  Context as CrossfilterContext,
  SET_FILTER,
} from 'components/Crossfilter'
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

const EstuariesList = ({ onSelect }) => {
  const { state, dispatch: filterDispatch } = useContext(CrossfilterContext)

  const listRef = useRef(null)
  const [listWrapperRef, { height: listHeight }] = useDimensions()
  const [sortIdx, setSortIdx] = useState(2) // default: north to south

  const handleQueryChange = (value) => {
    filterDispatch({
      type: SET_FILTER,
      payload: {
        field: 'name',
        filterValue: value,
      },
    })
  }

  const handleSortChange = (idx) => {
    if (idx === sortIdx) return

    setSortIdx(idx)

    // reset list to top
    if (listRef.current) {
      listRef.current.scrollTo(0)
    }
  }

  const data = state.get('data')
  const sortedData = data.sort(sortOptions[sortIdx].sortFunc)

  return (
    <Flex sx={{ flex: '1 1 auto', flexDirection: 'column', mt: '2rem' }}>
      <Flex
        sx={{
          px: '1rem',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ color: 'grey.600', fontSize: '0.8rem', lineHeight: 1.2 }}>
          {data.size} currently visible
        </Box>
        <SortBar
          index={sortIdx}
          options={sortOptions}
          onChange={handleSortChange}
        />
      </Flex>

      <SearchBar
        value={state.get('filters', Map()).get('name', '')}
        placeholder="Enter an estuary name"
        onChange={handleQueryChange}
      />

      {data.size > 0 ? (
        <Flex
          ref={listWrapperRef}
          sx={{
            flex: '1 1 auto',
            width: '100%',
            '&>div': {
              width: '100%',
            },
          }}
        >
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
        </Flex>
      ) : (
        <Box sx={{ color: 'grey.600', mt: '2rem', textAlign: 'center' }}>
          No visible estuaries...
        </Box>
      )}
    </Flex>
  )
}

EstuariesList.propTypes = {
  onSelect: PropTypes.func.isRequired,
}

export default EstuariesList

import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { FaSearch, FaRegTimesCircle } from 'react-icons/fa'
import { Flex } from 'components/Grid'

import styled, { themeGet } from 'util/style'

export const Wrapper = styled.div`
  background-color: ${themeGet('colors.grey.200')};
  padding: 0.5rem 1rem;
  margin-top: 0.25rem;
`

export const InnerWrapper = styled(Flex).attrs({
  alignItems: 'center',
  flexWrap: 'nowrap',
})`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: #fff;
  border: none;
  color: ${themeGet('colors.grey.600')};
`

export const SearchIcon = styled(FaSearch).attrs({
  size: '1rem',
})`
  width: 1rem;
  height: 1rem;
`

export const ClearIcon = styled(FaRegTimesCircle).attrs({
  size: '1rem',
})`
  width: 1rem;
  height: 1rem;
  cursor: pointer;

  visibility: ${({ visibility }) => visibility};

  &:hover {
    color: ${themeGet('colors.grey.800')};
  }
`

export const Input = styled.input`
  flex: 1 1 auto;
  font-size: 0.8rem;
  outline: none;
  border: none;
  padding: 0.1em 0.5em;
  color: ${themeGet('colors.grey.600')};

  &:active,
  &:focus {
    color: ${themeGet('colors.grey.800')};
  }
`

const SearchBar = ({ value, placeholder, onChange }) => {
  const handleChange = ({ target: { value: newValue } }) => {
    onChange(newValue)
  }

  const handleClear = () => {
    onChange('')
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <SearchIcon />
        <Input
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <ClearIcon
          visibility={value ? 'visible' : 'hidden'}
          onClick={handleClear}
        />
      </InnerWrapper>
    </Wrapper>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

SearchBar.defaultProps = {
  placeholder: '',
}

// only rerender on value change
export default memo(
  SearchBar,
  ({ value: prevValue }, { value: nextValue }) => prevValue === nextValue
)

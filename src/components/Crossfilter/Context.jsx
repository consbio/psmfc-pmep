import React, { createContext } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'

import { useCrossfilter } from './Crossfilter'

/**
 * Provide Crossfilter as a context so that components deeper in the
 * component tree can access crossfilter state or dispatch.
 */
export const Context = createContext()
export const Provider = ({ data, filters, children }) => {
  const [state, dispatch] = useCrossfilter(data, filters)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

Provider.propTypes = {
  data: ImmutablePropTypes.list.isRequired,
  filters: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
}

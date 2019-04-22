import { Children } from 'react'
import PropTypes from 'prop-types'

/**
 * Wrapper around tabs to return the tab that is active.
 *
 * @param {Array of nodes} children - child nodes, each must have an `id` prop
 * @param {String} activeTab - `id` of the active tab
 */
const TabContainer = ({ children, activeTab }) => {
  const [activeChild] = Children.toArray(children).filter(
    ({ props: { id } }) => id === activeTab
  )
  return activeChild || null
}

TabContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  activeTab: PropTypes.string.isRequired,
}

export default TabContainer

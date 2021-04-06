import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'theme-ui'

import TabBar from './TabBar'
import TabContainer from './TabContainer'
import Tab from './Tab'

const Tabs = ({ children }) => {
  const tabs = children.map(({ props: { id, label } }) => ({ id, label }))
  const firstTab = tabs[0].id

  const [tab, setTab] = useState(firstTab)

  const handleTabChange = (id) => {
    setTab(id)
  }

  return (
    <Flex sx={{ flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <TabBar tabs={tabs} activeTab={tab} onChange={handleTabChange} />
      <TabContainer activeTab={tab}>{children}</TabContainer>
    </Flex>
  )
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export { Tab, TabBar, TabContainer }

export default Tabs

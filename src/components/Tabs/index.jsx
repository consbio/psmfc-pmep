import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Flex } from 'components/Grid'
import styled from 'util/style'

import TabBar from './TabBar'
import TabContainer from './TabContainer'
import Tab from './Tab'

const Wrapper = styled(Flex).attrs({
  flexDirection: 'column',
})``

const Tabs = ({ children }) => {
  const tabs = children.map(({ props: { id, label } }) => ({ id, label }))
  const firstTab = tabs[0].id

  const [tab, setTab] = useState(firstTab)

  const handleTabChange = id => {
    setTab(id)
  }

  return (
    <Wrapper>
      <TabBar tabs={tabs} activeTab={tab} onChange={handleTabChange} />
      <TabContainer activeTab={tab}>{children}</TabContainer>
    </Wrapper>
  )
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export { Tab, TabBar, TabContainer }

export default Tabs

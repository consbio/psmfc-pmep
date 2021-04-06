import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'theme-ui'

import Button from './Button'

const TabBar = ({ tabs, activeTab, onChange }) => {
  const handleClick = (id) => {
    if (id !== activeTab) {
      onChange(id)
    }
  }
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: '0 0 auto',
        bg: 'grey.100',
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          active={activeTab === tab.id}
          onClick={handleClick}
          {...tab}
        />
      ))}
    </Flex>
  )
}

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

TabBar.defaultProps = {
  onChange: () => {},
}

export default memo(
  TabBar,
  (
    { tabs: prevTabs, activeTab: prevTab },
    { tabs: nextTabs, activeTab: nextTab }
  ) => prevTabs === nextTabs && prevTab === nextTab
)

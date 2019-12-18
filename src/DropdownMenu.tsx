import React from 'react'
import { Menu, Dropdown, Icon } from 'antd'

type DropdownMenuProps = {
  options: Array<string>
  handleMenuClick: (e: any) => void
}

const DropdownMenu = ({ options, handleMenuClick }: DropdownMenuProps) => {
  const menu = (
    <Menu onClick={handleMenuClick}>
      {options.map((item, i) => (
        <Menu.Item key={i}>
          <Icon type="user" />
          {item}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div id="user-dropdown">
      <Dropdown.Button overlay={menu} icon={<Icon type="user" />}>
        Select DevRel Member
      </Dropdown.Button>
    </div>
  )
}

export default DropdownMenu

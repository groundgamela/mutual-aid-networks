import React from 'react'
import { Menu, Select } from 'antd';
import { NavLink } from "react-router-dom";

import './style.scss';

const { Option } = Select

const NavMenu = (props) => {

  const handleLanguageSelection = (value) => {
    console.log(value)
  }

  const currentLanguageSelection = () => {
    return 'english'
  }

  const {
    handleNav,
    mode,
  } = props
  return (
    <>
      <div className="logo"></div>
      <Menu
        theme='dark'
        style={{ lineHeight: '64px' }}
        mode={mode}
        onClick={handleNav}
        selectedKeys={[window.location.pathname]}
      >
        <Menu.Item key="/">
          <NavLink to='/' exact>Map</NavLink>
        </Menu.Item>
        <Menu.Item key="/table-view">
          <NavLink to='/table-view' exact>Table View</NavLink>
        </Menu.Item>
        <Menu.Item key="/resources">
          <NavLink to='/resources' exact>Guides and Resources</NavLink>
        </Menu.Item>
        <Menu.Item key="/about">
          <NavLink to='/about' exact>About</NavLink>
        </Menu.Item>
        <Select
          onChange={handleLanguageSelection}
          className={`language-select-${mode}`}
          defaultValue={currentLanguageSelection}
        >
          <Option value='english'>English</Option>
          <Option value='spanish'>Spanish</Option>
        </Select>
      </Menu>
    </>
  )
}

export default NavMenu

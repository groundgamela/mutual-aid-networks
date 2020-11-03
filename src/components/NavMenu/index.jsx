import React from 'react'
import { Menu } from 'antd';
import { NavLink } from "react-router-dom";

const NavMenu = (props) => {
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
        <Menu.Item key="/table-of-networks">
          <NavLink to='/table-of-networks' exact>Table of Networks</NavLink>
        </Menu.Item>
        <Menu.Item key="/resources">
          <NavLink to='/resources' exact>Guides and Resources</NavLink>
        </Menu.Item>
        <Menu.Item key="/press">
          <NavLink to='/press' exact>Press</NavLink>
        </Menu.Item>
        <Menu.Item key="/about">
          <NavLink to='/about' exact>About</NavLink>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default NavMenu
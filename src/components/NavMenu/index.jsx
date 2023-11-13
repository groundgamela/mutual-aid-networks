import React from 'react'
import { Menu, Select } from 'antd';
import { NavLink } from "react-router-dom";

import { translations } from './language'

import './style.scss';

const { Option } = Select

const NavMenu = (props) => {

  const handleLanguageSelection = (value) => {
    const {
      setSiteLanguage
    } = props
    localStorage.setItem('siteLanguage', value)
    setSiteLanguage(value)
  }

  const currentLanguageSelection = () => {
    const {
      setSiteLanguage
    } = props
    const prevSelectedLanguage = localStorage.getItem('siteLanguage')
    if (prevSelectedLanguage) {
      setSiteLanguage(prevSelectedLanguage)
      return prevSelectedLanguage
    } else {
      handleLanguageSelection('english')
      return 'english'
    }
  }

  const {
    handleNav,
    mode,
    siteLanguage
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
          <NavLink to='/' >{translations.map[siteLanguage]}</NavLink>
        </Menu.Item>
        <Menu.Item key="/table-of-networks">
          <NavLink to='/table-of-networks'>{translations.networkTable[siteLanguage]}</NavLink>
        </Menu.Item>
        <Menu.Item key="/table-of-food-resources">
          <NavLink to='/table-of-food-resources' >{translations.foodTable[siteLanguage]}</NavLink>
        </Menu.Item>
        <Menu.Item key="/resources">
          <NavLink to='/resources' >{translations.resources[siteLanguage]}</NavLink>
        </Menu.Item>
        <Menu.Item key="/press">
          <NavLink to='/press' >{translations.press[siteLanguage]}</NavLink>
        </Menu.Item>
        <Menu.Item key="/about">
          <NavLink to='/about' >{translations.about[siteLanguage]}</NavLink>
        </Menu.Item>
        {mode === 'horizontal' &&
          <Select
            onChange={handleLanguageSelection}
            className='language-select language-select-horizontal'
            defaultValue={currentLanguageSelection}
          >
            <Option value='english'>English</Option>
            <Option value='spanish'>Español</Option>
          </Select>
        }
      </Menu>
      {mode === 'inline' &&
        <Select
          onChange={handleLanguageSelection}
          className='language-select'
          defaultValue={currentLanguageSelection}
        >
          <Option value='english'>English</Option>
          <Option value='spanish'>Español</Option>
        </Select>
      }
    </>
  )
}

export default NavMenu

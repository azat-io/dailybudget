import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import SVGInline from 'react-svg-inline'

import has from 'lodash/has'
import map from 'lodash/map'

import homeIcon from './home-icon.svg'
import settingsIcon from './settings-icon.svg'

import {
  border,
  primaryBackground,
} from 'etc/theme'

const StyledMenu = styled.menu`
  font-size: 15px;
  height: 100%;
  border-right: ${border};
  padding: 12px 24px;
  margin: 0;
`

const StyledMenuItem = styled.p`
  cursor: pointer;

  &:hover {
    color: ${primaryBackground};
    transition: all 0.3s;
  }
`

const StyledSubMenu = styled.div`
  margin-left: 25px;
`

const menuItems = [{
  title: 'На главную',
  key: 'home',
  icon: homeIcon,
  link: '/',
}, {
  title: 'Настройки',
  key: 'settings',
  icon: settingsIcon,
  submenu: [{
    title: 'Категории',
    key: 'categories',
    link: '/categories',
  }],
}]

const iconStyles = {
  marginRight: 12,
}

const Menu = () => (
  <StyledMenu>
    {
      map(menuItems, item => {
        const { title, icon, key } = item
        if (has(item, 'submenu')) {
          const { submenu, icon } = item
          return (
            <div key={key}>
              <StyledMenuItem>
                <SVGInline
                  svg={icon}
                  fill={'currentColor'}
                  style={iconStyles}
                  width={'13px'}
                  height={'13px'}
                />
                { title }
              </StyledMenuItem>
              <StyledSubMenu>
                {
                  map(submenu, ({ title: subTitle, key: subKey, link }) => (
                    <div key={subKey}>
                      <Link to={link}>
                        <StyledMenuItem>
                          { subTitle }
                        </StyledMenuItem>
                      </Link>
                    </div>
                  ))
                }
              </StyledSubMenu>
            </div>
          )
        }
        const { link } = item
        return (
          <div key={key}>
            <Link to={link}>
              <StyledMenuItem>
                <SVGInline
                  svg={icon}
                  fill={'currentColor'}
                  style={iconStyles}
                  width={'13px'}
                  height={'13px'}
                />
                { title }
              </StyledMenuItem>
            </Link>
          </div>
        )
      })
    }
  </StyledMenu>
)

export default Menu

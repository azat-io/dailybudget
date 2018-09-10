import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import SVGInline from 'react-svg-inline'

import logo from './logo.png'
import menuIcon from './menu-icon.svg'

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 122px 1fr;
  background: ${({ theme }) => theme.primaryBackground};
  color: ${({ theme }) => theme.primaryContrastColor};
  height: 24px;
  border-bottom: ${({ theme }) => theme.border};
  padding: 12px 24px;
`

const StyledLogo = styled.img`
  cursor: pointer;
  user-select: none;
`

const Header = () => (
  <StyledHeader>
    <SVGInline
      svg={menuIcon}
      fill={'currentColor'}
      width={'20px'}
      height={'20px'}
      style={{
        marginTop: 2,
        cursor: 'pointer',
      }}
    />
    <Link to={'/'}>
      <StyledLogo src={logo} alt={'Daily Budget'} />
    </Link>
  </StyledHeader>
)

export default Header

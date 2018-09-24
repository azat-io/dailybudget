import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import SVGInline from 'react-svg-inline'

import logo from './logo.svg'
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

const Header = ({ simplified }) => (
  <StyledHeader>
    <div>
      { simplified ? '' : (
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
      ) }
    </div>
    <Link to={'/'}>
      <SVGInline
        svg={logo}
        width={'128px'}
        height={'30px'}
        style={{
          cursor: 'pointer',
          userSelect: 'none',
          userDrag: 'none',
        }}
      />
    </Link>
  </StyledHeader>
)

Header.propTypes = {
  simplified: PropTypes.bool,
}

Header.defaultProps = {
  simplified: false,
}

export default Header

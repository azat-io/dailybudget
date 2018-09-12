import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { darken, lighten } from 'polished'

const StyledButton = styled.button`
  display: block;
  background: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.primaryContrastColor};
  font-size: 15px;
  border: 1px solid ${({theme}) => darken(0.025, theme.primaryColor)};
  border-radius: 100px;
  padding: 12px 16px;
  outline: 0;
  user-select: none;
  cursor: pointer;

  &:active,
  &:focus,
  &:hover {
    background: ${({ theme }) => darken(0.1, theme.primaryColor)};
    transition: background 0.3s;
  }

  &:disabled {
    background: ${({ theme }) => lighten(0.3, theme.primaryColor)};
    border: 1px solid ${({theme}) => lighten(0.25, theme.primaryColor)};
    cursor: not-allowed;
  }
`

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{ children }</StyledButton>
)

Button.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Button

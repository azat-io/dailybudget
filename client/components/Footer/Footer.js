import React from 'react'
import styled from 'styled-components'

import {
  border,
  primaryBackground,
  primaryColor,
} from 'etc/theme'

const StyledFooter = styled.footer`
  background: ${primaryBackground};
  font-size: 13px;
  color: ${primaryColor};
  border-top: ${border};
  padding: 12px 24px;
  text-align: center;
`

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <StyledFooter>
      { `Daily Budget 2018${currentYear > 2018 ? `-${currentYear}` : ''}` }
    </StyledFooter>
  )
}

export default Footer

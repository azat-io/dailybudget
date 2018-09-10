import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  background: ${({ theme }) => theme.primaryBackground};
  font-size: 13px;
  color: ${({ theme }) => theme.primaryContrastColor};
  border-top: ${({ theme }) => theme.border};
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

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Menu from 'components/Menu'

const StyledMain = styled.div`
  display: grid;
  grid-template-columns: 220px auto;
`

const StyledContent = styled.main`
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

const StyledChildren = styled.div`
  padding: 24px;
`

const Main = ({ children }) => (
  <StyledMain>
    <Menu />
    <StyledContent>
      <StyledChildren>
        { children }
      </StyledChildren>
    </StyledContent>
  </StyledMain>
)

Main.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Main

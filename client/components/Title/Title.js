import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const StyledTitle = styled.h2`
  display: block;
  font-size: 19px;
  font-weight: inherit;
  margin: 0 0 18px;
`

const Title = ({ name }) => (
  <StyledTitle>{ name }</StyledTitle>
)

Title.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Title

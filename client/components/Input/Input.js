import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const StyledField = styled.div`
  margin: 12px 0;
`

const StyledInput = styled.input`
  display: block;
  font-size: 15px;
  border: ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 8px;
  width: 280px;
  outline: 0;

  &:hover,
  &:active,
  &:focus {
    border-color: ${({ theme }) => theme.primaryColor};
    transition: border-color 0.5s;
  }
`

const StyledErrorMessage = styled.span`
  display: block;
  font-size: 15px;
  color: ${({ theme }) => theme.primaryColor};
  margin: 6px 0 0 10px;
`

const Input = ({
  input,
  type,
  placeholder,
  meta: {
    touched,
    error,
  },
}) => (
  <StyledField>
    <StyledInput
      type={type}
      placeholder={placeholder}
      {...input}
    />
    {touched && (error && <StyledErrorMessage>
      {error}
    </StyledErrorMessage>)}
  </StyledField>
)

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
}

export default Input

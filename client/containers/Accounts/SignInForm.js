import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import {
  Field,
  reduxForm,
} from 'redux-form'
import {
  compose,
  withHandlers,
} from 'recompose'

import get from 'lodash/get'

import Input from 'components/Input'
import Button from 'components/Button'

import {
  required,
  email,
  password,
} from 'etc/validation'

import SIGN_IN from './sign-in.gql'

const StyledSignInForm = styled.div`
  grid-area: sign-in;
`

const SignInForm = ({ handleSubmit, submitting, valid }) => (
  <StyledSignInForm>
    <Mutation mutation={gql`${SIGN_IN}`}>
      {
        (signIn, { data }) => (
          <form onSubmit={(event) => handleSubmit(event, signIn)}>
            <Field
              name={'email'}
              placeholder={'Email'}
              type={'text'}
              component={Input}
              validate={[required, email]}
            />
            <Field
              name={'password'}
              placeholder={'Пароль'}
              type={'password'}
              component={Input}
              validate={[required, password]}
            />
            <Button
              type={'submit'}
              disabled={submitting || !valid}
            >
              { 'Войти' }
            </Button>
          </form>
        )
      }
    </Mutation>
  </StyledSignInForm>
)

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
}

export default compose(
  reduxForm({
    form: 'signInForm',
  }),
  connect(({ form: { signInForm } }) => ({
    email: get(signInForm, 'values.email'),
    password: get(signInForm, 'values.password'),
  })),
  withHandlers({
    handleSubmit: ({ email, password, reset }) => async (event, signIn) => {
      event.preventDefault()
      try {
        const signInUser = await signIn({
          variables: {
            email,
            password,
          },
        })
        const { token } = get(signInUser, 'data.signIn')
        localStorage.setItem('TOKEN', token)
        reset()
      } catch (error) {
        console.log('Error:', error)
      }
    },
  }),
)(SignInForm)

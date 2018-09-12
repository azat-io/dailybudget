import React from 'react'
import PropTypes from 'prop-types'
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
import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'

import Title from 'components/Title'
import Input from 'components/Input'
import Button from 'components/Button'

import SIGN_UP from './sign-up.gql'

const validate = values => {
  const errors = {}
  if (isEmpty(values.email)) {
    errors.email = 'Поле обязательно для заполнения'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
    errors.email = 'Неверно введёт адрес email'
  }
  if (isEmpty(values.password)) {
    errors.password = 'Поле обязательно для заполнения'
  } else if (trim(values.password.length) < 6) {
    errors.password = 'Длина пароля должна быть менее 6 символов'
  }
  return errors
}

const SignUp = ({ handleSubmit, submitting, valid }) => (
  <Mutation mutation={gql`${SIGN_UP}`}>
    {
      (signUp, { data }) => (
        <form onSubmit={(event) => handleSubmit(event, signUp)}>
          <Title name={'Регистрация'} />
          <Field
            name={'email'}
            placeholder={'Email'}
            type={'text'}
            component={Input}
          />
          <Field
            name={'password'}
            placeholder={'Пароль'}
            type={'password'}
            component={Input}
          />
          <Button
            type={'submit'}
            disabled={submitting || !valid}
          >
            { 'Зарегистрироваться' }
          </Button>
        </form>
      )
    }
  </Mutation>
)

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
}

export default compose(
  reduxForm({
    form: 'signUpForm',
    validate,
  }),
  connect(({ form: { signUpForm } }) => ({
    email: get(signUpForm, 'values.email'),
    password: get(signUpForm, 'values.password'),
  })),
  withHandlers({
    handleSubmit: ({ email, password, reset }) => async (event, signUp) => {
      event.preventDefault()
      try {
        const signUpUser = await signUp({
          variables: {
            email,
            password,
          },
        })
        const { token } = get(signUpUser, 'data.signUp')
        localStorage.setItem('TOKEN', token)
        reset()
      } catch (error) {
        console.log('Error:', error)
      }
    },
  }),
)(SignUp)

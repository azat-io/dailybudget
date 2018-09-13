import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'

export const required = value => isEmpty(value)
  ? 'Поле обязательно для заполнения'
  : undefined

export const email = value => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)
  ? 'Неверно введён адрес email'
  : undefined

export const password = value => trim(value).length < 6
  ? 'Длина пароля должна быть не менее 6 символов'
  : undefined

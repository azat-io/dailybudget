import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'

import categoriesReducer from './categories-reducer'

const rootReducer = combineReducers({
  form: reduxFormReducer,
  categoriesReducer,
})

export default rootReducer

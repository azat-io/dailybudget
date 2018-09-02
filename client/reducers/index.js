import { combineReducers } from 'redux'

import categoriesReducer from './categories-reducer'

const rootReducer = combineReducers({
  categoriesReducer,
})

export default rootReducer

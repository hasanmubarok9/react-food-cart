import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import todos from './todos'
import cart from './cart'

export default combineReducers({ cart, todos, visibilityFilter })

import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import categories from './categories'
import players from './players'
import memeStream from './memeStream'


const reducer = combineReducers({categories, players, memeStream})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './categories'
export * from './players'
export * from './memeStream'


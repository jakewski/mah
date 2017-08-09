const {createStore, combineReducers, applyMiddleware} = require('redux')
const createLogger = require('redux-logger')
const thunkMiddleware = require('redux-thunk').default

const player = require('./player').reducer;
//if our constants are undefined we will get a ghost error

const reducer = combineReducers({player})

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
module.exports = store
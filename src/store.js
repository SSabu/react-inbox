import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import roodReducer from './reducers'
import logger from 'redux-logger'
import Api from './utils/Api'

const store = createStore(
  roodReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
  thunkMiddleware.withExtraArgument({ Api })
  )
)

export default store

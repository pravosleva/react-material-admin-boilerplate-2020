import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import logger from 'redux-logger'
import { IRootState } from './IRootState'
import { rootReducer } from './reducers'
import { rootSaga } from './sagas'

declare global {
  interface Window {
    fetch: (url: string, options?: {}) => Promise<any>
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}

// const isDev = process.env.NODE_ENV === 'development'
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose
const middlewares = []

// if (isDev) middlewares.push(logger)
middlewares.push(sagaMiddleware)

export const store: IRootState = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

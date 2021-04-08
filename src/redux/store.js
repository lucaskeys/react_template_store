import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist'
import logger from 'redux-logger';
// import thunk from 'redux-thunk' == placing thunk with saga
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-saga'  

const sagaMiddleware = createSagaMiddleware()

const middlewares = [logger, sagaMiddleware];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);

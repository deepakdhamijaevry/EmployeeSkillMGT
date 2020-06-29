import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './app/reducers';
import rootSaga from './app/sagas';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );
  // use the same saga middleware that you have enhanced your store with
  sagaMiddleware.run(rootSaga);
  return store;
}

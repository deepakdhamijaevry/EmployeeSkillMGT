import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './app/reducers';

export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import callApiMiddleware from './actions/call-api-middleware';

const middleware = [
  thunk,
  callApiMiddleware,
];

const enhancer = compose(
  applyMiddleware(...middleware),
);

const configureStore = (initialState) => createStore(rootReducer, initialState, enhancer);

export default configureStore;

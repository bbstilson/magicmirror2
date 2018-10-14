import rootReducer from './modules/index.js';

import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger()

export default () => {
  return applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore)(rootReducer);
}

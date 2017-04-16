import { createStore, combineReducers } from 'redux';

import airCondition from './reducers/airCondition';

export default (state = {}) => {
  const reducer = combineReducers({
    airCondition,
  })

  return createStore(reducer, state);
}
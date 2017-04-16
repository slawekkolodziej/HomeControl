import { combineReducers } from 'redux';
import { AIR_CONDITION } from '../constants'

const initialState = {
  state: 'off',
  mode: 'auto',
  temperature: 22,
  fan: 0
}

function temperature( state = initialState.temperature, action ) {
  switch ( action.type ) {
    case AIR_CONDITION.CHANGE_TEMPERATURE:
      return {
        ...state,
        temperature: action.temperature
      };
    default:
      return state;
  }
}

function mode( state = initialState.mode, action ) {
  switch ( action.type ) {
    case AIR_CONDITION.CHANGE_MODE:
      return {
        ...state,
        mode: action.mode
      };
    default:
      return state;
  }
}

function state( state = initialState.state, action ) {
  switch ( action.type ) {
    case AIR_CONDITION.CHANGE_STATE:
      return {
        ...state,
        state: action.state
      };
    default:
      return state;
  }
}

function fan( state = initialState.fan, action ) {
  switch ( action.type ) {
    case AIR_CONDITION.CHANGE_FAN:
      return {
        ...state,
        fan: action.fan
      };
    default:
      return state;
  }
}

export default combineReducers({
  temperature,
  mode,
  state,
  fan,
});
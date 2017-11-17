import { formReducer, modelReducer } from 'react-redux-form';
import { DISPLAY_RESPONSE_MESSAGE, UPDATE_MESSAGE } from '../actions.js'

const initialState= {
  message: "",
  author: "Ian Butler" //hardcoded for demo purposes
}

const componentInitialState = {
  displayResponseMessage: null,
  setPending: false
}

const sendRequest = (action, state) => {
  return {
    ...state,
    sendRequest: action.res.response,
  }
}

const displayResponseMessage = (action, state) => {
  return {
    ...state,
    displayResponseMessage: action.res.response,
  }
}

const updateMessage = (action, state) => {
  if ( action.type == "UPDATE_MESSAGE") {
    console.log(state);
    return {
      ...state,
      message: action.message,
    }
  }
}

export const chatboxStateReducer = (state=componentInitialState, action) => {
  const actions = {
    DISPLAY_RESPONSE_MESSAGE: displayResponseMessage,
    UPDATE_MESSAGE: updateMessage
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action, state)
}
export const chatboxFormReducer = formReducer('chatbox', initialState)
export const chatboxModelReducer = modelReducer('chatbox', initialState)

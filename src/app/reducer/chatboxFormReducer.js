import { formReducer, modelReducer } from 'react-redux-form';
import { DISPLAY_RESPONSE_MESSAGE, SENT_MESSAGE } from '../actions.js'

const initialState= {
  request: "",
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

export const chatboxStateReducer = (state=componentInitialState, action) => {
  const actions = {
    DISPLAY_RESPONSE_MESSAGE: displayResponseMessage,
    SENT_MESSAGE: sentMessage
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action)
}
export const chatboxFormReducer = formReducer('chatbox', initialState)
export const chatboxModelReducer = modelReducer('chatbox', initialState)

import { formReducer, modelReducer } from 'react-redux-form';
import { DISPLAY_RESPONSE_MESSAGE, ADD_MESSAGE_TO_LIST } from '../actions.js'

const initialState= {
  message: "",
  author: "Ian Butler" //hardcoded for demo purposes
}

const componentInitialState = {
  displayResponseMessage: null,
  setPending: false,
  messageList: []
}

const sendRequest = (action, state) => {
  return {
    ...state,
    sendRequest: action.res.response,
  }
}
const addMessageToList = (action,  state) => {
  return {
    ...state,
    messageList: [ ...state.messageList, action.msg ]
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
    ADD_MESSAGE_TO_LIST: addMessageToList
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action, state)
}
export const chatboxFormReducer = formReducer('chatbox', initialState)
export const chatboxModelReducer = modelReducer('chatbox', initialState)

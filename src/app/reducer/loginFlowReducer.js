import { TOGGLE_LOGIN_REGISTER, COMPLETE_REGISTRATION } from '../actions.js'

const initialState = {
  displayLogin: true,
  registered: false,
  registeredMsg: ''
}

const toggleLoginRegister = (action, state) => {
  return {
    ...state,
    displayLogin: action.bool
  }
}

const completeRegistration = (action, state) => {
  return {
    ...state,
    registered: true,
    registeredMsg: action.msg
  }
}

export const LoginFlowStateReducer = (state=initialState, action) => {
  const actions = {
    TOGGLE_LOGIN_REGISTER: toggleLoginRegister,
    COMPLETE_REGISTRATION: completeRegistration
  }
  if(typeof actions[action.type] === 'undefined') { return state }
  return actions[action.type](action, state)
}


export const DISPLAY_RESPONSE_MESSAGE = 'DISPLAY_RESPONSE_MESSAGE'
export const ADD_MESSAGE_TO_LIST = 'ADD_MESSAGE_TO_LIST'
export const SHOW_HIDDEN_MESSAGES = 'SHOW_HIDDEN_MESSAGES'
export const CLEAR_PENDING_MESSAGES = 'CLEAR_PENDING_MESSAGES'
export const ADD_PENDING_MESSAGE = 'ADD_PENDING_MESSAGE'
export const TOGGLE_LOGIN_REGISTER = 'TOGGLE_LOGIN_REGISTER'
export const LOAD_STORED_STATE = 'LOAD_STORED_STATE'
export const SET_TOKEN = 'SET_TOKEN'
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN'
export const SET_TEAMS = 'SET_TEAMS'
export const SET_ACTIVE_TEAM = 'SET_ACTIVE_TEAM'

export const toggleLoginRegister = () => ({type: TOGGLE_LOGIN_REGISTER})
export const displayResponseMessage = (res) => ({ type: DISPLAY_RESPONSE_MESSAGE, res })
export const addMessageToList = (msg) => ({type: ADD_MESSAGE_TO_LIST, msg})
export const showHiddenMessages = () => ({type: SHOW_HIDDEN_MESSAGES})
export const clearPendingMessages = () => ({type: CLEAR_PENDING_MESSAGES})
export const addPendingMessage = (msg) => ({type: ADD_PENDING_MESSAGE, msg})
export const setSessionToken = (token) => ({type: SET_TOKEN, token})
export const toggleLogin = () => ({type: TOGGLE_LOGIN})
export const setTeams = (teams) => ({type: SET_TEAMS, teams})
export const setActiveTeam = (team) => ({type: SET_ACTIVE_TEAM, team})



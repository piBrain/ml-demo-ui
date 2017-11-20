export const DISPLAY_RESPONSE_MESSAGE = 'DISPLAY_RESPONSE_MESSAGE'
export const ADD_MESSAGE_TO_LIST = 'ADD_MESSAGE_TO_LIST'
export const SHOW_HIDDEN_MESSAGES = 'SHOW_HIDDEN_MESSAGES'
export const CLEAR_PENDING_MESSAGES = 'CLEAR_PENDING_MESSAGES'
export const ADD_PENDING_MESSAGE = 'ADD_PENDING_MESSAGE'
export const displayResponseMessage = (res) => ({ type: DISPLAY_RESPONSE_MESSAGE, res })
export const addMessageToList = (msg) => ({type: ADD_MESSAGE_TO_LIST, msg})
export const showHiddenMessages = () => ({type: SHOW_HIDDEN_MESSAGES})
export const clearPendingMessages = () => ({type: CLEAR_PENDING_MESSAGES})
export const addPendingMessage = (msg) => ({type: ADD_PENDING_MESSAGE, msg})




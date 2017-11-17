export const DISPLAY_RESPONSE_MESSAGE = 'DISPLAY_RESPONSE_MESSAGE'
export const ADD_MESSAGE_TO_LIST = 'ADD_MESSAGE_TO_LIST'
export const displayResponseMessage = (res) => ({ type: DISPLAY_RESPONSE_MESSAGE, res })
export const addMessageToList = (msg) => ({type: ADD_MESSAGE_TO_LIST, msg})



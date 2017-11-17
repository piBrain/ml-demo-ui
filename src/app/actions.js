export const DISPLAY_RESPONSE_MESSAGE = 'DISPLAY_RESPONSE_MESSAGE'

export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

export const displayResponseMessage = (res) => ({ type: DISPLAY_RESPONSE_MESSAGE, res })
export const updateMessage = (message) => ({ type: UPDATE_MESSAGE, message })

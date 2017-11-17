export const DISPLAY_RESPONSE_MESSAGE = 'DISPLAY_RESPONSE_MESSAGE'

export const displayResponseMessage = (res) => ({ type: DISPLAY_RESPONSE_MESSAGE, res })

export const SENT_MESSAGE = 'SENT_MESSAGE'

export const sentMessage = (message) => ({ type: SENT_MESSAGE, message })

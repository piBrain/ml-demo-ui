import { combineForms } from 'react-redux-form'

const chatFormInitialState= {
  message: "",
  author: "Ian Butler" //hardcoded for demo purposes
}

const loginInitialState = {
  email: "",
  password: "",
}

const registerInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  day: "01",
  month: "01",
  phoneNumber: "",
  year: "1990",
  gender: "m",
  location: "USA",
  secQuestion1: "What was the name of your first pet?",
  secQuestionResponse1: "",
  secQuestion2: "What was your most rewarding moment in life?",
  secQuestionResponse2: ""
}

export default combineForms({
  chatbox: chatFormInitialState,
  login: loginInitialState,
  register: registerInitialState
}, 'forms')


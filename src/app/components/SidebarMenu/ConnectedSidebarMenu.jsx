import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import {
  toggleLoginRegister, toggleLogin,
  setSessionToken, setTeams,
  addMessageToList, setActiveTeam,
  completeRegistration
} from '../../actions.js'
import { bindActionCreators } from 'redux'
import { actions } from 'react-redux-form'
import SidebarMenu from './SidebarMenu.jsx'

const mapStateToProps = (state) => ({
  displayLogin: state.loginFlowState.displayLogin,
  loggedIn: state.session.loggedIn,
  registered: state.loginFlowState.registered,
  registeredMsg: state.loginFlowState.registeredMsg,
  token: state.session.token,
  teams: state.session.teams,
  activeTeam: state.session.activeTeam
})

const signUpUser = gql`mutation subreg($firstName: String!,
                                       $lastName: String!,
                                       $phoneNumber: String!,
                                       $email: String!,
                                       $birthday: Date!,
                                       $location: String!,
                                       $gender: String!,
                                       $password: String!,
                                       $secQuestion1: String!,
                                       $secQuestionResponse1: String!,
                                       $secQuestion2: String!,
                                       $secQuestionResponse2: String!) {
                                     signUpUser(
                                        firstName: $firstName,
                                        lastName: $lastName,
                                        phoneNumber: $phoneNumber,
                                        email: $email,
                                        birthday: $birthday,
                                        gender: $gender,
                                        countryCode: $location,
                                        password: $password,
                                        secQuestion1: $secQuestion1,
                                        secQuestion2: $secQuestion2,
                                        secQuestionResponse1: $secQuestionResponse1,
                                        secQuestionResponse2: $secQuestionResponse2
                                      )
                                    }`

const loginUser = gql`mutation sublog($email: String!, $password: String!) {
  login(email: $email, password: $password)
}`

const submitSignUp = graphql(signUpUser, {
  name: 'submitSignUp',
  props: ({submitSignUp}) => ({
    submitSignUp: (args) => {
      return submitSignUp({ variables: {...args},})
    }
  }),
})

const submitLogin = graphql(loginUser, {
  name: 'submitLogin',
  props: ({submitLogin}) => ({
    submitLogin: (args) => {
      return submitLogin({ variables: {...args} })
    }
  })
})


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleLoginRegister,
    toggleLogin,
    setSessionToken,
    setTeams,
    setActiveTeam,
    addMessageToList,
    completeRegistration,
    clearForm: actions.reset,
    setFormErrors: actions.setErrors,
    resetFormValidity: actions.resetValidity
  }, dispatch)
}

export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  submitSignUp,
  submitLogin
)(SidebarMenu)

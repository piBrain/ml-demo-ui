import { connect } from 'react-redux'
import { graphql, compose, withApollo } from 'react-apollo'
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

const mapStateToProps = (state) => { 
  return {
  displayLogin: state.loginFlowState.displayLogin,
    loggedIn: state.session.loggedIn,
    registered: state.loginFlowState.registered,
    registeredMsg: state.loginFlowState.registeredMsg,
    token: state.session.token,
    activeTeam: state.session.activeTeam,
} }

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
const loadTeams = gql`query loadTeams($nonce: String!) {
  getTeams(nonce: $nonce)
}`
const subscribeTeams = gql`subscription teamUpdates($nonce: String!) {
  teams(nonce: $nonce)
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


const executeLoadTeams = graphql(loadTeams, {
  name: 'teams',
  options: (props) => {
    return {
      variables: { nonce: props.token }
    }
  },
  props: props => {
    return {
      teams: props.teams,
      subscribeToTeamUpdates: args => {
        return props.teams.subscribeToMore({
          document: subscribeTeams,
          variables: {
            nonce: args.nonce
          },
          updateQuery: (prev, {subscriptionData}) => {
            if(!subscriptionData.data || !subscriptionData.data.teams) {
              return prev
            }
            const message = subscriptionData.data.teams
            if(message.type == 'USER_REMOVED_FROM_TEAM') {
              const oldTeam = message.team
              const updatedList = prev.teams.filter((team) => team.name == oldTeam.name)
              return { ...prev, teams: updatedList }
            }
            if(message.type == 'USER_ADDED_TO_TEAM') {
              const newTeam = message.team
              return { ...prev, teams: [...prev.teams, newTeam] }
            }
          }
        })
      }
    }
  }
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

export default withApollo(compose(
  connect( mapStateToProps, mapDispatchToProps ),
  submitSignUp,
  submitLogin,
  executeLoadTeams
)(SidebarMenu))

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import {
  toggleLoginRegister, toggleLogin,
  setSessionToken, setTeams,
  addMessageToList, setActiveTeam
} from '../../actions.js'
import { bindActionCreators } from 'redux'
import { actions } from 'react-redux-form'
import SidebarMenu from './SidebarMenu.jsx'

const mapStateToProps = (state) => ({
  displayLogin: state.loginFlowState.displayLogin,
  loggedIn: state.session.loggedIn,
  token: state.session.token,
  teams: state.session.teams,
  activeTeam: state.session.activeTeam
})


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    toggleLoginRegister,
    toggleLogin,
    setSessionToken,
    setTeams,
    setActiveTeam,
    addMessageToList,
    clearForm: actions.reset
  }, dispatch)
}

export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
)(SidebarMenu)

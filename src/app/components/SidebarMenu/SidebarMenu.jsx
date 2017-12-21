import React, { Component, PropTypes } from 'react';
import './SidebarMenu.css';
import Profile from '../Profile/Profile.jsx';
import Login from '../Login/Login.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import SideHeader from '../SideHeader/SideHeader.jsx';
import ServiceSelector from '../ServiceSelector/ServiceSelector.jsx'
import TeamSelector from '../TeamSelector/TeamSelector.jsx'
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  async handleLogin(vals) {
    var email = vals.email.trim();
    var password = vals.password;
    if (!email || !password) {
      return;
    }
    const askServerForSession = (await this.props.submitLogin({email, password})).data.login
    if(!askServerForSession.err) {
      const token = askServerForSession.data.nonce
      this.props.toggleLogin()
      this.props.setSessionToken(token)
      const teams = (await this.props.client.resetStore())[0].data.getTeams.data.teams
      if(!teams.length > 0) { return }
      this.props.setActiveTeam(teams[0])
      const askServerForMessages = ((token) => ({
        err: false, data: { messages: [
          {team: 'piBrain', message: 'Hi', author: 'Ian Butler'},
          {team: 'piBrain', message:'Test message', author: 'Aura'},
          {team: 'team2', message: 'Today is a wonderful day.', author: 'Ian Butler'}
        ] }}))(token)
      askServerForMessages.data.messages.forEach((msg) => this.props.addMessageToList(msg))
      return
    }
    this.props.setFormErrors('forms.login', { badCreds: true })
  }

  async handleRegister(vals) {
    const birthday = `${vals.year}-${vals.month}-${vals.day}`
    const userInfo =  { ...vals, birthday }
    delete userInfo.day
    delete userInfo.month
    delete userInfo.year
    const res =  await this.props.submitSignUp(userInfo)
    const data = res.data.signUpUser
    if(data.err && data.response == 'There is already an active user with that email.') {
      this.props.setFormErrors('forms.register.email', { existingUser: true })
      return
    }
    this.props.clearForm('forms.register')
    this.props.completeRegistration(data.response)
  }

  async componentWillMount() {
    await this.props.subscribeToTeamUpdates({ nonce: this.props.token })
  }

  render(props) {
    var sideClassName = 'side-container'
    if (this.props.loggedIn) {
      sideClassName = sideClassName + ' ' + 'active'
    } else {
      if(!this.props.displayLogin) { sideClassName = sideClassName + ' ' + 'register'}
    }
    let teams = []
    if(!this.props.teams.loading) {
      teams = this.props.teams.getTeams.data.teams
    }
    return (
      <div className={sideClassName} >
      <div>
      <Profile active={this.props.loggedIn} />
      <TeamSelector data={teams} active={this.props.loggedIn} setActiveTeam={this.props.setActiveTeam}/>
      </div>
      <SideHeader active={!this.props.loggedIn} toggleLogin={this.props.toggleLoginRegister} displayLogin={this.props.displayLogin} animate={true} />
      <Login active={(this.props.displayLogin && this.props.loggedIn == false )} handleSubmit={this.handleLogin} />
      <SignUp
        resetFormValidity={this.props.resetFormValidity}
        handleSubmit={this.handleRegister}
        active={(!this.props.displayLogin && this.props.loggedIn == false)}
        registered={this.props.registered}
        registeredMsg={this.props.registeredMsg}
      />
      <p className={this.props.toggleLogin ? "footer-links adjust" : "footer-links"}>
      <span className="link">Privacy</span> / <span className="link">Terms</span> / piBrain © {new Date().getFullYear()}
      </p>
      </div>
    );
  }
}

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

  handleLogin(vals) {
    var email = vals.email.trim();
    var password = vals.password;
    if (!email || !password) {
      return;
    }
    const askServerForSession = ((email, password) => ({ err: false, data: { token: 'I-am-token' }}))(email, password)

    if(!askServerForSession.err) {
      const token = askServerForSession.data.token
      this.props.toggleLogin()
      this.props.setSessionToken()
      const askServerForTeams = ((token) => ({err: false, data: { teams: [{name: 'piBrain'}, {name: 'team2'}] }}))(token)
      this.props.setTeams(askServerForTeams.data.teams)
      this.props.setActiveTeam(askServerForTeams.data.teams[0])
      const askServerForMessages = ((token) => ({
        err: false, data: { messages: [
          {team: 'piBrain', message: 'Hi', author: 'Ian Butler'},
          {team: 'piBrain', message:'Test message', author: 'Aura'},
          {team: 'team2', message: 'Today is a wonderful day.', author: 'Ian Butler'}
        ] }}))(token)
      askServerForMessages.data.messages.forEach((msg) => this.props.addMessageToList(msg))
    }


  }

  componentDidMount() {
    if(this.props.loggedIn) {
      const askServerForTeams = ((token) => ({err: false, data: { teams: [{name: 'piBrain'}, {name: 'team2'}] }}))(this.props.token)
      this.props.setTeams(askServerForTeams.data.teams)
      console.log(this.props)
      const objIncluded = (arr, obj) => {
        for(let x in arr) {
          if(obj.name == x.name) {return true}
        }
        return false
      }
      if(!objIncluded(askServerForTeams.data.teams, this.props.activeTeam)) {
        this.props.setActiveTeam(askServerForTeams.data.teams[0])
      }
    }
  }

  handleRegister(vals) {

  }

  render(props) {
    var sideClassName = 'side-container'
    if (this.props.loggedIn) {
      sideClassName = sideClassName + ' ' + 'active'
    } else {
      if(!this.props.displayLogin) { sideClassName = sideClassName + ' ' + 'register'}
    }
    return (
      <div className={sideClassName} >
      <div>
      <Profile active={this.props.loggedIn} />
      <TeamSelector data={this.props.teams} active={this.props.loggedIn} setActiveTeam={this.props.setActiveTeam}/>
      </div>
      <SideHeader active={!this.props.loggedIn} toggleLogin={this.props.toggleLoginRegister} animate={true} />
      <Login active={(this.props.displayLogin && this.props.loggedIn == false )} handleSubmit={this.handleLogin} />
      <SignUp active={(!this.props.displayLogin && this.props.loggedIn == false)} />
      <p className={this.props.toggleLogin ? "footer-links adjust" : "footer-links"}>
      <span className="link">Privacy</span> / <span className="link">Terms</span> / piBrain © {new Date().getFullYear()}
      </p>
      </div>
    );
  }
}

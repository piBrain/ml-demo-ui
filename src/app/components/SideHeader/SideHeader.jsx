import React, { Component, PropTypes } from 'react';
import './SideHeader.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SideHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(props) {
    return (
      <ReactCSSTransitionGroup transitionName = "side-header"
        transitionAppear = {this.props.active} transitionAppearTimeout = {500}
        transitionEnter = {false} transitionLeave = {false}>
      <div className={this.props.active ? "header-container active" : "header-container"}>
        <p key="new" className="login-header">
        <span className={this.props.displayLogin ? "login active" : "login"} onClick={ () => this.props.toggleLogin(true)}>Login</span>|
        <span className={this.props.displayLogin ? "signup" : "signup active"} onClick={ () => this.props.toggleLogin(false)}>Register</span>
        </p>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}

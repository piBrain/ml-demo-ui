import React from 'react';
import './Header.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

  render (props) {
    return (
      <ReactCSSTransitionGroup transitionName = "main-fade"
        transitionAppear = {true} transitionAppearTimeout = {500}
        transitionEnter = {false} transitionLeave = {false}>
        <div className="header">
          <Link to={'/'} className="logo">
            <p className="logo-text">Aura</p>
          </Link>
          <div className="links-container">
            <ReactCSSTransitionGroup transitionName = "header-fade"
              transitionAppear = {true} transitionAppearTimeout = {500}
              transitionEnter = {false} transitionLeave = {false}>
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </ReactCSSTransitionGroup>

    );
  }
}

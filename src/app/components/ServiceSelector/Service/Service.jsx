import React, { Component, PropTypes } from 'react';
import './Service.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Timestamp from 'react-timestamp';
//require(`../../../../assets/material-letters/${this.props.name}.svg`)
export default class Service extends Component {
  constructor(props) {
    super(props);
    this.doClick = this.doClick.bind(this)
  }
  doClick(e) {
    e.preventDefault()
    this.props.handleClick(this.props.name)
  }
  render(props) {
    return (
      <li className={'service'} onClick={this.doClick}>
        <div className="logo">
          <img src={this.props.logo} alt={this.props.name} />
        </div>
        <div className="name">
          <p className="name">{this.props.name}</p>
        </div>
      </li>
    );
  }
}

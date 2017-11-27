import React, { Component, PropTypes } from 'react';
import './Team.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Timestamp from 'react-timestamp';
//require(`../../../../assets/material-letters/${this.props.name}.svg`)
export default class Team extends Component {
  constructor(props) {
    super(props)
    this.doClick = this.doClick.bind(this)
  }
  doClick(e) {
    e.preventDefault()
    this.props.handleClick(this.props.name)
  }
  render(props) {
    return (
      <li className={'team'} onClick={this.doClick}>
          <div className="top-c">
            <div className="avatar">
              <img src='' alt={this.props.name} />
            </div>
          </div>
          <div className="name">
            <p className="name">{this.props.name}</p>
          </div>
      </li>

    );
  }
}

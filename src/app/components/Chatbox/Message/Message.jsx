import React, { Component, PropTypes } from 'react';
import './Message.css';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Timestamp from 'react-timestamp';

export default class Message extends Component {
  render(props) {
    return (
      <div className="message-container">
        <div className="profile-img-c">
          <div className="profile-img" ></div>
        </div>
        <div className="detail-c">
          <div className="top-c">
            <h2 className="author">{this.props.author}</h2>
            <p className="timestamp"><Timestamp time={this.created_at} format='time' /></p>
          </div>
            <p className="title">{this.props.role}</p>
          <p className="message">:      {this.props.children}</p>
        </div>
      </div>

    );
  }
}

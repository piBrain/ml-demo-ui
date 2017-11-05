import React, { Component, PropTypes } from 'react';
import './MessageList.css';
import Message from '../Message/Message.jsx';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class MessageList extends Component {
  render(props) {
    var messages = this.props.data.map((message, index)=>{
      return ( <Message key={index} author={message.author}>{message.text}</Message>);
    })

    return (
      <div className={"messages-container"}>
        {messages}
      </div>
    );
  }
}



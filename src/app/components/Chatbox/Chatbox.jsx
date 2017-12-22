import React, { Component, PropTypes } from 'react';
import './Chatbox.css';
import MessageList from './MessageList/MessageList.jsx';
import InputBox from './InputBox/InputBox.jsx';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Chatbox extends Component {
  constructor(props) {
    super(props);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  async handleMessageSubmit( values ) {
   this.props.setPending('forms.chatbox', true);
   try {
     const userMessage = { ...values, nonce: this.props.token, teamName: this.props.activeTeam.name }
     this.props.clearForm('forms.chatbox')
     const res = await this.props.chatboxSendRequest(userMessage)
    } catch(e) {
      console.error(e)
      this.props.setSubmitFailed('chatbox')
   }
  }

  async componentWillMount() {
    await this.props.subscribeToMessages({ nonce: this.props.token })
  }

  render(props) {
    let messages = []
    if(!this.props.messages.loading && this.props.messages.getMessages.data.messages.length > 0) {
      messages = this.props.messages.getMessages.data.messages
      if(this.props.messages.getMessages.data.messages[0].team != this.props.activeTeam.name) {
        this.props.messages.refetch()
        messages = []
      }
    }
    return (
      <div id="chatbox" className={this.props.loggedIn ?  "chatbox-container active" : "chatbox-container"}>
        <MessageList data={messages}/>
        <InputBox handleMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
}

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
    this.state = {
      data: [{message:[]}],
    }

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  async handleMessageSubmit( values ) {
   this.props.setPending('chatbox', true);
   try {
     this.props.clearForm('chatbox')
     this.props.addMessageToList(values)
     const res = await this.props.chatboxSendRequest(values)
     if(res.data.sendRequest.err) {
       this.props.addPendingMessage({author:'Aura', message:"I'm sorry, something seems to have gone wrong on my end.", show: false})
     } else {
       this.props.addPendingMessage({author: 'Aura', message: res.data.sendRequest.data, show: false})
     }
    } catch(e) {
      console.error(e)
      this.props.setSubmitFailed('chatbox')
      this.props.displaySubmitError({err: true, response: 'Whoops! Something went wrong.'})
   }
  }

  componentDidUpdate(prevProps) {
    const doShow = prevProps.messageList.some((msg) => !msg.show )
    if(doShow) {
      prevProps.showHiddenMessages()
    }
    if(prevProps.pendingMessages.length > 0) {
      prevProps.clearPendingMessages()
    }
  }

  render(props) {
    return (
      <div id="chatbox" className={"chatbox-container"}>
        <MessageList data={this.props.messageList}/>
        <InputBox handleMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
}

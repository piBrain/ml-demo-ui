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
     console.log(res)
     if(res.data.sendRequest.err) {
       this.props.addMessageToList({author:'Aura', message:"I'm sorry, something seems to have gone wrong on my end."})
     } else {
       this.props.addMessageToList({author: 'Aura', message: res.data.sendRequest.data})
     }
    } catch(e) {
      console.error(e)
      this.props.setSubmitFailed('chatbox')
      this.props.displaySubmitError({err: true, response: 'Whoops! Something went wrong.'})
   }
  }

  render(props) {
    console.log(this.props)
    return (
      <div id="chatbox" className={"chatbox-container"}>
        <MessageList data={this.props.messageList}/>
        <InputBox handleMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
}

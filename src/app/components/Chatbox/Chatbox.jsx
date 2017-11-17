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
  componentDidMount() {
    //setInterval(()=>{this.setState({ data: this.props.data});},2000);
  }

  async handleMessageSubmit( chatbox, values ) {
    console.log(this.props)
   this.props.setPending('chatbox', true);
   try {
      const params = { ...values, url: `${window.location.href.match(/^.*\//)[0]}predict` }
      const res = await this.props.chatboxSendRequest(params)
      this.props.displayResponseMessage(res.data.chatboxSendRequest)
    } catch(e) {
      console.error(e)
      this.props.setSubmitFailed('chatbox')
      this.props.displaySubmitError({err: true, response: 'Whoops! Something went wrong.'})
   }
  }

  render(props) {
    let chatbox = this.props;
    return (
      <div id="chatbox" className={"chatbox-container"}>
        <MessageList data={this.state.data}/>
        <InputBox handleMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
}

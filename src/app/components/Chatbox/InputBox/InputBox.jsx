import React, { Component, PropTypes } from 'react';
import './InputBox.css';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class InputBox extends Component {
  constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(val) {
    this.props.handleMessageSubmit(val);
  }
  render(props) {
    return (
      <Form model="chatbox" className="inputbox-form" onSubmit={this.handleSubmit} >
      <span> <div/> </span>
      <Control.text model='.message' />
      <input type="submit" style={{ display: 'none' }} value="Post" />
      </Form>
    );
  }
}

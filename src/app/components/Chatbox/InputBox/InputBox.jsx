import React, { Component, PropTypes } from 'react';
import './InputBox.css';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class InputBox extends Component {
  constructor(props){
    super(props);
    this.state={
      author:'',
      request:''
    };
    this.handleAuthorChange=this.handleAuthorChange.bind(this);
    this.handleTextChange=this.handleTextChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleAuthorChange(e){
    console.log("handleAuthorChange event triggered");
    this.setState({
      author: e.target.value
    });
  }
  handleTextChange(e){
    console.log("handleTextChange event triggered");
    this.setState({
      text: e.target.value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    // if(!text || !author ){
    //     return;
    // }
    this.props.handleMessageSubmit({author:author,text:text});
    this.setState({author: '',text:''});
  }
  render(props) {
    let chatbox = this.props;
    return (
      <Form model="chatbox" className="inputbox-form" onSubmit={(values) => this.props.handleMessageSubmit(chatbox, values)} >
      <span> <div/> </span>
      <input type="text" placeholder="type to talk to aura!!?" />
      <input type="submit" style={{ display: 'none' }} value="Post" />
      </Form>
    );
  }
}

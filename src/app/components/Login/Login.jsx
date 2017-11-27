import React, { Component, PropTypes } from 'react';
import './Login.css';
import InputField from '../InputField/InputField.jsx';
import { Errors, Field, Form, Control, actions } from 'react-redux-form';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  validateEmail(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  validatePassword( value ) {
    return true;
  }
  commonValidate() {
    return true;
  }

  render(props) {
    return (
      <div id="login" className={this.props.active ? "login-container active" : "login-container" }>
      <Form model="forms.login" className="login-form" onSubmit={this.props.handleSubmit}>
        <Control.text type="email" model='.email' className={"input email"} placeholder='john.doe@example.com'/>
        <br></br>
        <Control.text model='.password' type={"password"} className={"input password"} placeholder='password'/>
        <p className="forgot-password">Forgot your passsword? Click <span className="link">here</span>!</p>
        <input className="submit-btn" type="submit" value="Submit" />
      </Form>
      </div>
    );
  }
}

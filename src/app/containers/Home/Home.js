import React, { Component } from 'react';
import Chatbox from '../../components/Chatbox/Chatbox.jsx';
import './Home.css';
import Particles from 'react-particles-js';

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isMobile: isMobile.any()
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin () {
    //manages the state of login validation from the server should go here
    this.setState( { loggedIn: true } );
  }

  render(props) {

    var data =  [
      {
        author: 'Aura',
        id: 1,
        text: "hello"
      },
      {
        author: 'user',
        id: 2,
        text: "no"
      }
    ];

    return (
      <div>
        <div className='app-container'>
          <div className={this.props.sidebar_active ? 'aura-container pushed' : 'aura-container' }>
            <Chatbox data={data} />
          </div>
        </div>
      </div>
    );
  }
}


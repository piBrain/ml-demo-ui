import React, { Component } from 'react';
import ConnectedChatbox from '../../components/Chatbox/ConnectedChatbox.jsx';
import ConnectedSidebarMenu from '../../components/SidebarMenu/ConnectedSidebarMenu.jsx'
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
  }

  render(props) {
    return (
      <div>
        <div className='app-container'>
          <div className={this.props.sidebar_active ? 'aura-container pushed' : 'aura-container' }>
            <ConnectedChatbox />
            <ConnectedSidebarMenu />
          </div>
        </div>
      </div>
    );
  }
}


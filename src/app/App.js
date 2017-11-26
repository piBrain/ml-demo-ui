import React, { Component } from 'react';
import Header from './components/Header/Header.jsx';
import './App.css';
import { Provider } from 'react-redux';
import { apolloClient, store } from './store.js';
import Home from './containers/Home/Home.js';
import { Switch, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar_active: false,
      loggedIn: false
    };
  }

  render(props) {
    return (
			<ApolloProvider store= { store } client = { apolloClient } >
      <div>
        <Header sidebar_active={this.state.sidebar_active} toggleSidebar={this.toggleSidebar} />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
			</ApolloProvider>
    );
  }
}

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import { chatboxFormReducer, chatboxModelReducer, chatboxStateReducer } from './reducer/chatboxFormReducer.js'
import { LoginFlowStateReducer } from './reducer/loginFlowReducer.js'
import sessionReducer from './reducer/session.js'
import formsReducer from './reducer/forms.js'
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import getConfigs from '../../config'
import link from './networkInterface'
import { createSession } from 'redux-session'

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
const session = createSession({
  ns: 'aura-cli',
  throttle: 5000,
  selectState: (state) => ({
    token : state.session.token,
    loggedIn: state.session.loggedIn,
    activeTeam: state.session.activeTeam
  }),
  adapter: 'localStorage'
})

const combinedReducers = combineReducers({
  chatboxState: chatboxStateReducer,
  loginFlowState: LoginFlowStateReducer,
  forms: formsReducer,
  session: sessionReducer
})

const store = createStore(combinedReducers, /* preloadedState, */ compose(
  applyMiddleware(thunk, session),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export { store, apolloClient }

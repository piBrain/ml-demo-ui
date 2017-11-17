import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import {
  combineForms,
} from 'react-redux-form';
import { chatboxFormReducer, chatboxModelReducer, chatboxStateReducer } from './reducer/chatboxFormReducer.js'
import thunk from 'redux-thunk';
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import getConfigs from '../../config'
const { apiUrl } = getConfigs()
const networkInterface = createNetworkInterface({ uri: `${apiUrl}/graphql` })
const apolloClient = new ApolloClient({
  networkInterface
})

const combinedReducers = combineReducers({
  chatboxForm: chatboxFormReducer,
  chatbox: chatboxModelReducer,
  chatboxState: chatboxStateReducer,
  apollo: apolloClient.reducer(),
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combinedReducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));
export { store, apolloClient }

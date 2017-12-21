import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import getConfigs from '../../config'

const { apiUrl, wsUrl } = getConfigs()
console.log(apiUrl)
// Create an http link:
const httpLink = new HttpLink({
  uri: `${apiUrl}/graphql`
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export default link

import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'
import { actions } from 'react-redux-form'
import gql from 'graphql-tag'

import Chatbox from './Chatbox.jsx'

import {
  addMessageToList, displayResponseMessage,
  addPendingMessage, clearPendingMessages
} from '../../actions.js'


const sendRequest = gql`
  mutation($message: String!, $nonce: String!, $author: String!, $teamName: String!) {
    sendRequest(
      message: $message,
      nonce: $nonce,
      author: $author,
      teamName: $teamName
    )
  }
`
const loadMessages = gql`query loadMessages($nonce: String!, $timeStamp: DateTime!, $teamFilter: JSON!) {
  getMessages(nonce: $nonce, timeStamp: $timeStamp, teamFilter: $teamFilter)
}`

const subscribeMessages = gql`subscription messageUpdates($nonce: String!) {
  messages(nonce: $nonce)
}`

const executeLoadMessages = graphql(loadMessages, {
  name: 'messages',
  options: (props) => {
    return {
      variables: {
        nonce: props.token,
        timeStamp: (new Date()).toISOString(),
        teamFilter: props.activeTeam
      }
    }
  },
  props: props => {
    return {
      messages: props.messages,
      subscribeToMessages: args => {
        return props.messages.subscribeToMore({
          document: subscribeMessages,
          variables: {
            nonce: args.nonce,
            timeStamp: (new Date()).toISOString()
          },
          updateQuery: (prev, {subscriptionData}) => {
            if(!subscriptionData.data || !subscriptionData.data.messages) {
              return prev
            }
            const messages = subscriptionData.data.messages
            console.log(messages)
            const newData =  { ...prev, getMessages: { ...prev.getMessages, data: { messages: [...prev.getMessages.data.messages, ...messages] } }}
            console.log(newData)
            return newData
          }
        })
      }
    }
  }
})
const chatboxSendRequest = graphql(sendRequest, {
  name: 'chatboxSendRequest',
  props: ({ chatboxSendRequest }) => ({
    chatboxSendRequest: ( { message, nonce, author, teamName } ) => {
      return chatboxSendRequest ({
        variables: {
          message,
          nonce,
          author,
          teamName
        },
      })
    }
  }),
})

const mapStateToProps = (state) => {
  return {
  activeTeam: state.session.activeTeam,
  messageList: state.chatboxState.messageList,
  pendingMessages: state.chatboxState.pendingMessages,
  author: state.forms.chatbox.author,
  responseMessage: state.chatboxState.displayResponseMessage,
  loggedIn: state.session.loggedIn,
  token: state.session.token
}}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      setPending: actions.setPending,
      setSubmitFailed: actions.setSubmitFailed,
      clearForm: actions.reset,
    },
    dispatch)
}

export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  chatboxSendRequest,
  executeLoadMessages
)(Chatbox)

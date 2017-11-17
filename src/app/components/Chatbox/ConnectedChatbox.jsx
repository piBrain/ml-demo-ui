import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'
import { actions } from 'react-redux-form'
import gql from 'graphql-tag'

import Chatbox from './Chatbox.jsx'

import { addMessageToList, displayResponseMessage } from '../../actions.js'

const sendRequest = gql`
  mutation($message: String!, $author: String!) {
    sendRequest(
      message: $message,
      author: $author
    )
  }
`
const chatboxSendRequest = graphql(sendRequest, {
  name: 'chatboxSendRequest',
  props: ({ chatboxSendRequest }) => ({
    chatboxSendRequest: ( { message, author } ) => {
      return chatboxSendRequest ({
        variables: {
          message,
          author,
        },
      })
    }
  }),
})

const mapStateToProps = (state) => ({
  messageList: state.chatboxState.messageList,
  author: state.chatboxForm.author.value,
  responseMessage: state.chatboxState.displayResponseMessage,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setPending: actions.setPending,
      setSubmitFailed: actions.setSubmitFailed,
      clearForm: actions.reset,
      addMessageToList,
      displayResponseMessage,
    },
    dispatch
  )
}

export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  chatboxSendRequest,
)(Chatbox)

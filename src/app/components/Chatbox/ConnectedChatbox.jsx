import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

import { bindActionCreators } from 'redux'
import { actions } from 'react-redux-form'
import gql from 'graphql-tag'

import Chatbox from './Chatbox.jsx'

import { displayResponseMessage } from '../../actions.js'

const sendRequest = gql`
  mutation($request: String!, $author: String!) {
    sendRequest(
      message: $request,
      author: $author
    )
  }
`
const chatboxSendRequest = graphql(sendRequest, {
  name: 'chatboxSendRequest',
  props: ({ chatboxSendRequest }) => ({
    chatboxSendRequest: ( { request, author } ) => {
      return chatboxSendRequest ({
        variables: {
          request,
          author,
        },
      })
    }
  }),
})

const mapStateToProps = (state) => ({ responseMessage: state.chatboxState.displayResponseMessage })


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      sentMessage: actions.sentMessage,
      setPending: actions.setPending,
      setSubmitFailed: actions.setSubmitFailed,
      displayResponseMessage
    },
    dispatch
  )
}

export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  chatboxSendRequest,
)(Chatbox)

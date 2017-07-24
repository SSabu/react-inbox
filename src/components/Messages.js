import React, { Component } from 'react';
import Message from './Message.js';
import { connect } from 'react-redux'
import { getMessages } from '../actions'
import { bindActionCreators } from 'redux'

class Messages extends Component {

  componentDidMount(){
    this.props.getMessages();
  }

  render() {

    const { messages } = this.props;

    return (
      <div>
        <div>
            {this.props.messages.map( (message) => <Message key={message.id} id = {message.id} labels={message.labels} selected={message.selected} starred={message.starred} read={message.read} subject={message.subject} body={message.body}/> )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const messages = state.messages
  return {
    messages
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)

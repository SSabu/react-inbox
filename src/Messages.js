import React, { Component } from 'react';
import Message from './Message.js';

class Messages extends Component {

  render() {
    return (
      <div>
        <div>
            { this.props.messages.map( (message) => { return <Message message={message} key={message.id} toggleProperty={this.props.toggleProperty} /> })}
        </div>
      </div>
    )
  }
}

export default Messages;

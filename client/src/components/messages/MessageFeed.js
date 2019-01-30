import React, { Component } from 'react';

class MessageFeed extends Component {
  render() {
    let messageContent;
    if (!this.props.messages) {
      messageContent = <h1>You have 0 messages</h1>;
    } else {
      messageContent = this.props.messages.map(message => (
        <li key={message.id}>{message.text}</li>
      ));
    }
    return (
      <div>
        <h1>Message Feed</h1>
        <div>{messageContent}</div>
      </div>
    );
  }
}

export default MessageFeed;

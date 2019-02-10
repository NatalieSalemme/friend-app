import React, { Component } from 'react';
import MessageItem from './MessageItem';

class MessageFeed extends Component {
  render() {
    let messageContent;
    if (!this.props.messages) {
      messageContent = <h1>You have 0 messages</h1>;
    } else {
      messageContent = this.props.messages.map(message => (
        <MessageItem key={message._id} message={message} />
      ));
    }
    return (
      <div>
        <div>{messageContent.reverse()}</div>
      </div>
    );
  }
}

export default MessageFeed;

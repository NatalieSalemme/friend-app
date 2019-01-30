import React, { Component } from 'react';

class MessageItem extends Component {
  render() {
    const { message } = this.props;
    return (
      <div style={{ border: '2px solid black' }} className="my-2">
        <div>Text: {message.text}</div>
        <div>Date: {message.date}</div>
        <div>From: {message.user}</div>
      </div>
    );
  }
}

export default MessageItem;

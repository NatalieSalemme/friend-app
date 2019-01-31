import React from 'react';
import moment from 'moment';

class MessageItem extends React.Component {
  render() {
    const { message } = this.props;
    console.log(this.props);
    let messageDate = message.date.toString();
    // let formattedDate = moment({ messageDate }, 'MM/DD/YYYY');
    return (
      <div style={{ border: '2px solid black' }} className="my-2">
        <div>Text: {message.message}</div>
        <div>{moment(messageDate).format('MM/DD/YYYY LT')}</div>
        <div>From: {message.from}</div>
      </div>
    );
  }
}

export default MessageItem;

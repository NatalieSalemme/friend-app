import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessageThread } from '../../actions/messageActions';
import Spinner from '../common/Spinner';
import MessageThreadItem from './MessageThreadItem';

class MessageThread extends Component {
  componentDidMount() {
    this.props.getMessageThread(this.props.match.params.id);
    // console.log('mounting');
  }
  render() {
    const { message } = this.props;
    // console.log('messageThread', message.message);
    let messageContent;

    if (message === null || Object.keys(message).length === 0) {
      messageContent = <Spinner />;
    } else {
      messageContent = <MessageThreadItem message={message} />;
    }
    return (
      <div>
        <h1>Message Thread</h1>
        <div>{messageContent}</div>
        <button>Reply</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
});
export default connect(
  mapStateToProps,
  { getMessageThread }
)(MessageThread);

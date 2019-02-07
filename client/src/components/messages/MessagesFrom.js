import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessagesFrom } from '../../actions/messageActions';
import MessageThreadItem from './MessageThreadItem';
import MessageFeed from './MessageFeed';
import Spinner from '../common/Spinner';

class MessagesFrom extends Component {
  componentDidMount() {
    this.props.getMessagesFrom(this.props.match.params.senderId);
  }
  render() {
    const { message } = this.props.message;
    // let messages = message.map(msg => <div key={msg._id}>{msg.date}</div>);
    // console.log(message);
    let messageContent;
    if (message === null || Object.keys(message).length === 0) {
      messageContent = <Spinner />;
    } else {
      messageContent = message.map(msg => (
        <MessageThreadItem message={msg} key={msg._id} />
      ));
    }

    return (
      <div>
        <div className="col-md-6 row">
          <Link
            to="/messages/all"
            className="btn btn-light ml-5 mt-5 float-left text-white"
            style={{ backgroundColor: '#1f0891' }}
          >
            Back To Messages
          </Link>
        </div>
        <h1 className="text-center mt-5">Messages From</h1>
        {messageContent}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  message: state.message,
});
export default connect(
  mapStateToProps,
  { getMessagesFrom }
)(MessagesFrom);

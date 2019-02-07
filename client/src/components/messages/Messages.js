import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/messageActions';
import MessageFeed from './MessageFeed';
import Spinner from '../common/Spinner';

class Messages extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  render() {
    const { messages } = this.props.message;
    const uniqueUsers = [];
    if (!messages) {
      let content = <Spinner />;
    } else {
      messages.filter(function(msg) {
        let i = uniqueUsers.findIndex(x => x.user === msg.user);
        if (i <= -1) {
          uniqueUsers.push(msg);
        }
        return null;
      });
    }
    return (
      <div>
        <h1 className="text-center mt-4">Messages</h1>
        <div className="text-center">
          <MessageFeed messages={uniqueUsers} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  message: state.message,
});
export default connect(
  mapStateToProps,
  { getMessages }
)(Messages);

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
    let content;
    const uniqueUsers = [];
    if (!messages) {
      content = <Spinner />;
    } else {
      messages.filter(msg => {
        let i = uniqueUsers.findIndex(x => x.user === msg.user);
        if (i <= -1) {
          uniqueUsers.push(msg);
        }
        return null;
      });
    }
    return (
      <div
        style={{
          backgroundColor: '#E9EBEE',
          padding: '2em 0 4em',
          marginBottom: '-3em',
        }}
      >
        <h1 className="text-center mt-4">Messages</h1>
        <div className="text-center">
          <MessageFeed messages={uniqueUsers} />
          {content}
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

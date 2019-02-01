import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/messageActions';
import MessageFeed from './MessageFeed';

class Messages extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  render() {
    const { messages } = this.props.message;

    return (
      <div>
        <h1 className="text-center mt-4">Messages</h1>
        <div className="text-center">
          <MessageFeed messages={messages.reverse()} />
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

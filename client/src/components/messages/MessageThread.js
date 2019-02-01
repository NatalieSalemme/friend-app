import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessageThread } from '../../actions/messageActions';
import Spinner from '../common/Spinner';
import MessageItem from './MessageItem';

class MessageThread extends Component {
  componentDidMount() {
    this.props.getMessageThread(this.props.match.params.id);
    console.log('mounting');
  }
  render() {
    const { message } = this.props;
    console.log(message);
    let messageContent;

    if (message === null || Object.keys(message).length === 0) {
      messageContent = <Spinner />;
    } else {
      messageContent = <h1>yoyo</h1>;
    }
    return (
      <div>
        <h1>Message Thread</h1>
        {/* <div>{messageContent}</div> */}
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

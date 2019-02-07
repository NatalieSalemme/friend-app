import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessagesFrom } from '../../actions/messageActions';
import MessageThreadItem from './MessageThreadItem';
import MessageFeed from './MessageFeed';
import Spinner from '../common/Spinner';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class MessagesFrom extends Component {
  componentDidMount() {
    this.props.getMessagesFrom(this.props.match.params.senderId);
  }
  render() {
    const { message } = this.props.message;

    // let messages = message.map(msg => <div key={msg._id}>{msg.date}</div>);
    // console.log(message);
    let messageContent;
    let sender;
    if (message === null || Object.keys(message).length === 0) {
      messageContent = <Spinner />;
    } else {
      sender = message[0].from;
      messageContent = message.map(msg => (
        <MessageThreadItem message={msg} key={msg._id} />
      ));
    }

    return (
      <div
        style={{
          backgroundColor: '#E9EBEE',
          paddingBottom: '5em',
          marginBottom: '-4em',
        }}
      >
        <div className="col-md-6 row">
          <Link
            to="/messages/all"
            className="btn btn-light ml-5 mt-5 float-left text-white"
            style={{ backgroundColor: '#1f0891' }}
          >
            Back To Messages
          </Link>
        </div>
        <h1 className="text-center my-5">Messages From {sender}</h1>
        {messageContent}

        <div className="post-form mb-3 col-md-6 mx-auto">
          <div className="card card-info">
            <div
              className="card-header  text-white"
              style={{ backgroundColor: '#1f0891' }}
            >
              Send a Message
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Enter a message"
                    name="text"
                    // avatar={this.state.avatar}
                    // value={this.state.text}
                    onChange={this.onChange}
                    // error={errors.text}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark"
                  style={{ backgroundColor: '#1f0891' }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
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
  { getMessagesFrom }
)(MessagesFrom);

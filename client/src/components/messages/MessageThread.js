import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessageThread } from '../../actions/messageActions';
import Spinner from '../common/Spinner';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
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

        <div className="post-form mb-3 col-md-6 mx-auto">
          <div className="card card-info">
            <div className="card-header bg-info text-white">Reply</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Reply to post"
                    name="text"
                    // avatar={this.state.avatar}
                    // value={this.state.text}
                    onChange={this.onChange}
                    // error={errors.text}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
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
  { getMessageThread }
)(MessageThread);

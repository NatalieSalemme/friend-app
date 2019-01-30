import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/messageActions';

class Messages extends Component {
  componentDidMount() {
    this.props.getMessages();
  }
  render() {
    console.log(this.props.message);
    return (
      <div>
        <h1 className="text-center mt-4">Messages</h1>
        <p className="text-center">You have 0 new messages</p>
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

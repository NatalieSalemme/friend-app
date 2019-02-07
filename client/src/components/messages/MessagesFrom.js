import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMessagesFrom } from '../../actions/messageActions';

class MessagesFrom extends Component {
  componentDidMount() {
    this.props.getMessagesFrom(this.props.match.params.senderId);
  }
  render() {
    // console.log('props are today', this.props);
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profileActions';

class FriendRequestItem extends Component {
  render() {
    const { request } = this.props;
    return (
      <div>
        <h5>User: {request.user}</h5>
        {/* <h5>Id: {request._id}</h5> */}
        <h1>{request.name && request.name}</h1>
      </div>
    );
  }
}

export default connect(
  null,
  { getProfileById }
)(FriendRequestItem);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import {
  acceptFriendRequest,
  deleteFriendRequest,
} from '../../actions/profileActions';

class FriendRequestItem extends Component {
  acceptFriendRequest = (id, userId) => {
    this.props.acceptFriendRequest(id, userId);
  };
  onDeleteRequest = (id, userId) => {
    this.props.deleteFriendRequest(id, this.props.auth.user.id);
  };
  render() {
    const { request } = this.props;
    // const { user } = this.props.auth;
    return (
      <div className="card card-body mb-3 col-md-4 mx-auto">
        <div className="container">
          <div className="row">
            <br />
            <div>
              <Link to={`/profile/user/${request.user}`}>
                {/* <img
                  style={{ width: '130px', height: '130px' }}
                  src={require('../images/rose.jpg')}
                  alt="avatar"
                /> */}
                <img
                  className="rounded-circle d-none d-md-block"
                  src={`http://localhost:3000/api/users/${request.user}/avatar`}
                  alt="avatar"
                  style={{ width: '130px', height: '130px' }}
                />

                <h6 className="text-center mt-2 text-body">
                  {request.name && request.name}
                </h6>
              </Link>
            </div>
            {/* <h5>Id: {request._id}</h5> */}
            {/* <h5>User: {request.user}</h5> */}
            <div className="col-md-6 mx-auto my-auto">
              <button
                type="button"
                className="btn btn-success btn-lg mr-2"
                onClick={() =>
                  this.acceptFriendRequest(request._id, request.user)
                }
              >
                Accept
              </button>
              {/* </div>
                <div className="col-md-2"> */}
              <button
                type="button"
                className="btn btn-danger btn-lg ml-2"
                onClick={() => this.onDeleteRequest(request._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { getProfileById, deleteFriendRequest, acceptFriendRequest }
)(FriendRequestItem);

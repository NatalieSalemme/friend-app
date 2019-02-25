import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profileActions';
import { Link } from 'react-router-dom';

class FriendRequestItem extends Component {
  render() {
    const { request } = this.props;
    return (
      <div className="card card-body mb-3 col-md-4 mx-auto">
        <div className="container">
          <div className="row">
            {/* <div className="col-md-2"> */}
            <br />
            <div>
              <img
                style={{ width: '130px', height: '130px' }}
                src={require('../images/rose.jpg')}
                alt="avatar"
              />
              <h6 className="text-center mt-2">
                {request.name && request.name}
              </h6>
            </div>
            {/* <h5>Id: {request._id}</h5> */}

            {/* </div> */}
            {/* <h5>User: {request.user}</h5> */}
            {/* <div className="container col-md-2">
              <div className="row">
                <div className="col-md-2"> */}
            <div className="col-md-6 mx-auto my-auto">
              <button type="button" className="btn btn-success btn-lg mr-2">
                Accept
              </button>
              {/* </div>
                <div className="col-md-2"> */}
              <button type="button" className="btn btn-danger btn-lg ml-2">
                Delete
              </button>
            </div>
            {/* </div>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getProfileById }
)(FriendRequestItem);

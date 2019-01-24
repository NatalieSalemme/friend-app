import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    // Hobbies List
    const hobbies = profile.hobbies.map((hobby, index) => (
      <div key={index} className="p-3">
        <i className="far fa-circle" /> {hobby}
      </div>
    ));
    // BucketList List
    const bucketlist = profile.bucketlist.map((item, index) => (
      <div key={index} className="p-3">
        <i className="far fa-circle" /> {item}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3>{firstName}'s Bio</h3>
            <p className="lead text-left">
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center ">Hobbies </h3>
            <div className="row">
              <div className="mx-auto col-10 d-flex flex-wrap justify-content-center align-items-center">
                {hobbies}
              </div>
            </div>
            <hr />
            <h3 className="text-center ">Bucket List</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {bucketlist}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;

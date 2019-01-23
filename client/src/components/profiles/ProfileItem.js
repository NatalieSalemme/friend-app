import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <Link to={`/profile/${profile.handle}`}>
              <img
                className="img-thumbnail mr-3"
                src={require('../images/rose.jpg')}
                alt="avatar"
              />
            </Link>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <Link
              to={`/profile/${profile.handle}`}
              className="btn text-white"
              style={{ backgroundColor: '#1f0891' }}
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Hobbies</h4>
            <ul className="list-group">
              {profile.hobbies.slice(0, 4).map((hobby, index) => (
                <li key={index} className="list-group-item">
                  {hobby}
                </li>
              ))}
            </ul>
            <ul className="list-group">
              {profile.bucketlist.slice(0, 4).map((bucketlist, index) => (
                <li key={index} className="list-group-item">
                  {bucketlist}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};
export default ProfileItem;

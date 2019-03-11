import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    let profileContent;
    console.log('profile***', profile.user);
    if (profile === null) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <Link to={`/profile/${profile.handle}`} className="btn text-white">
            <img
              className="card-img-top img-thumbnail"
              src={require('../images/rose.jpg')}
              alt="Avatar"
            />
          </Link>

          <div className="card-body">
            {' '}
            <h5 className="card-title list-group-item text-center">
              {profile.name && profile.name}
            </h5>
          </div>

          <ul className="list-group list-group-flush  ">
            <li className="card-text list-group-item ">
              Status: "{profile.status}"
            </li>
            <li className="list-group-item">
              {profile.location ? profile.location : `It's a mystery`}
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div
        className="card mx-2 my-3 mx-auto"
        style={{ minWidth: '15em', maxWidth: '15em' }}
      >
        {profileContent}
      </div>
    );
  }
}
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};
export default ProfileItem;

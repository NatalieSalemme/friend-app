import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    let profileContent;
    // let name = profile.name.split(' ').map(s => s);
    if (profile === null) {
      profileContent = <Spinner />;
    } else {
      let avatar;
      if (profile.user.avatar === undefined) {
        avatar = require('../images/anonymous.jpg');
      } else {
        avatar = `http://localhost:3000/api/users/${profile.user._id}/avatar`;
      }
      let profName = profile.name
        .split(' ')
        .map((s, i) => <h5 key={i}>{s}</h5>);
      profileContent = (
        <div>
          <Link to={`/profile/${profile.handle}`} className="btn text-white">
            <img
              className="card-img-top img-thumbnail"
              src={avatar}
              alt="avatar"
            />
          </Link>

          <div className="card-body" style={{ minHeight: '7.5em' }}>
            {' '}
            <div className="card-title list-group-item text-center">
              {profile.name && profName}
            </div>
          </div>

          <ul className="list-group list-group-flush  ">
            <li
              className="card-text list-group-item d-flex align-items-center"
              style={{ minHeight: '5em' }}
            >
              Status: "{profile.status}"
            </li>
            <li className="list-group-item d-flex align-items-center">
              {profile.location
                ? `Location: ${profile.location}`
                : `Location: It's a mystery`}
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div
        className="card mx-2 my-3 mx-auto"
        style={{
          minWidth: '15em',
          maxWidth: '15em',
        }}
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

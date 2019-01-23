import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    if (!this.props) {
      return <div>Loading...</div>;
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-secondary text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 ">
                {profile.user.avatar ? (
                  <img
                    className="rounded-circle"
                    src={profile.user.avatar}
                    alt=""
                  />
                ) : (
                  <img
                    className="img-thumbnail"
                    src={require('../images/rose.jpg')}
                    alt="avatar"
                  />
                )}
                <h1 className="display-4 text-center">{profile.user.name}</h1>

                <div className="text-center col">
                  <div>
                    <i className="fas fa-home fa-2x" />
                  </div>

                  <div>
                    {isEmpty(profile.location) ? null : (
                      <p>{profile.location}</p>
                    )}
                  </div>
                </div>
                <p className="lead text-center">
                  Current Status: {profile.status}{' '}
                  {isEmpty(profile.company) ? null : (
                    <span>at {profile.company}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="text-center">
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;

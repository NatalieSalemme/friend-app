import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import ProfileCreds from './ProfileCreds';
import ProfileAbout from './ProfileAbout';
import FriendsListProfile from './FriendsListProfile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFriendRequest } from '../../actions/profileActions';

import Spinner from '../common/Spinner';

class ProfileHeader extends Component {
  onFriendRequestClick(handle) {
    this.props.addFriendRequest(handle);
    // console.log(this.state);
  }

  render() {
    const { profile } = this.props;
    console.log(this.props.errors);
    let profileContent;
    if (!profile) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="row">
          <div className="col-md-12">
            <div
              className="card card-body mb-3"
              style={{ backgroundColor: '#d8d3e8' }}
            >
              <div className="row">
                <div className="col-4 col-md-3">
                  {profile.user && (
                    <img
                      className="img-thumbnail"
                      src={require('../images/rose.jpg')}
                      alt="avatar"
                    />
                  )}

                  <div className="bg-white">
                    <h1 className="display-6 text-center">
                      {profile.user && profile.user.name}
                    </h1>

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
                    <div className="container">
                      <div className="row justify-content-md-center">
                        <Link to={`/messages/to/${profile.user._id}`}>
                          <div className="col-md-auto">
                            <i
                              className="far fa-envelope fa-2x"
                              style={{ color: 'red' }}
                            />
                          </div>
                        </Link>

                        <div className="col-md-auto">
                          <i
                            onClick={() =>
                              this.onFriendRequestClick(profile.handle)
                            }
                            className="fas fa-plus fa-2x"
                            style={{ color: 'green' }}
                          />
                        </div>
                        <div>
                          {this.props.errors.alreadyFriendRequested && (
                            <div className="alert alert-danger" role="alert">
                              {this.props.errors.alreadyFriendRequested}
                            </div>
                          )}
                        </div>

                        <div>
                          {this.props.errors.friendrequesterror && (
                            <div className="alert alert-danger" role="alert">
                              {this.props.errors.friendrequesterror}
                            </div>
                          )}
                        </div>

                        <div>
                          {this.props.errors.alreadyFriends && (
                            <div className="alert alert-danger" role="alert">
                              {this.props.errors.alreadyFriends}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pb-2">
                      <p>
                        {isEmpty(profile.website) ? null : (
                          <a
                            className=" p-2"
                            href={`https://${profile.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fas fa-globe fa-2x" />
                          </a>
                        )}

                        {isEmpty(
                          profile.social && profile.social.twitter
                        ) ? null : (
                          <a
                            className=" p-2"
                            href={`https://${profile.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-twitter fa-2x" />
                          </a>
                        )}

                        {isEmpty(
                          profile.social && profile.social.facebook
                        ) ? null : (
                          <a
                            className=" p-2"
                            href={`https://${profile.social.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-facebook fa-2x" />
                          </a>
                        )}

                        {isEmpty(
                          profile.social && profile.social.linkedin
                        ) ? null : (
                          <a
                            className=" p-2"
                            href={`https://${profile.social.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-linkedin fa-2x" />
                          </a>
                        )}

                        {isEmpty(
                          profile.social && profile.social.instagram
                        ) ? null : (
                          <a
                            className=" p-2"
                            href={`https://${profile.social.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-instagram fa-2x" />
                          </a>
                        )}
                      </p>
                    </div>
                    <div className="pb-5">
                      <FriendsListProfile profile={profile} />
                    </div>
                  </div>
                </div>

                <div className="text-center col-8">
                  <ProfileAbout profile={this.props.profile} />
                  <ProfileCreds
                    education={this.props.education}
                    experience={this.props.experience}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{profileContent}</div>;
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { addFriendRequest }
)(ProfileHeader);

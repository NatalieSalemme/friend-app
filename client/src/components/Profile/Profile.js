import React, { Component } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileComments from './ProfileComments';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }

    window.scrollTo(0, 0);

    console.log('profile component');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/profiles"
                className="btn btn-light mb-5 mt-4 float-left text-white"
                style={{ backgroundColor: '#1f0891' }}
              >
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader
            profile={profile}
            education={profile.education}
            experience={profile.experience}
          />
          <ProfileComments />
        </div>
      );
    }
    return (
      <div
        className="profile"
        style={{
          backgroundColor: '#E9EBEE',
          paddingBottom: '5em',
          marginBottom: '-3em',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);

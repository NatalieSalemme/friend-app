import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import { getProfileById } from '../../actions/profileActions';

class IdProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
    window.scrollTo(0, 0);
    console.log('id profile component');
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
const mapStateToProps = state => ({
  profile: state.profile,
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(IdProfile);

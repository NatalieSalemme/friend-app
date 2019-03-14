import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;

    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading || user === null) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      let firstName = user.name.split(' ')[0];
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h1 className="my-5 text-center">
              Hi{' '}
              <Link className="text-dark" to={`/profile/${profile.handle}`}>
                {firstName}!
              </Link>
            </h1>
            <div className="row">
              <ProfileActions />
              <div className="col">
                <Experience experience={profile.experience} />

                <Education education={profile.education} />
              </div>
            </div>
            <div className="mt-5 ml-5 text-center row">
              <button
                onClick={this.onDeleteClick}
                className="btn btn-danger mx-auto"
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div
        className="dashboard"
        style={{
          backgroundColor: '#E9EBEE',
          paddingBottom: '5em',
          marginBottom: '-4em',
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);

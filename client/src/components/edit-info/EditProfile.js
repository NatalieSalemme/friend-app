import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  state = {
    handle: '',
    website: '',
    location: '',
    status: '',
    hobbies: '',
    bucketlist: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    errors: {},
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //Bring array back to CSV
      const hobbiesCSV = profile.hobbies.join(',');
      const bucketlistCSV = profile.bucketlist.join(',');
      //If profile field doesn't exist, make empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.status = !isEmpty(profile.status) ? profile.status : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

      //Social Icons
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      //set component fields state
      this.setState({
        handle: profile.handle,

        website: profile.website,
        location: profile.location,
        status: profile.status,
        hobbies: hobbiesCSV,
        bucketlist: bucketlistCSV,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      hobbies: this.state.hobbies,
      bucketlist: this.state.bucketlist,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
    };
    this.props.createProfile(profileData, this.props.history);
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mt-5">Edit Profile</h1>

              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="A short status for people browsing to see"
                />

                <TextFieldGroup
                  placeholder="* Hobbies"
                  name="hobbies"
                  value={this.state.hobbies}
                  onChange={this.onChange}
                  error={errors.hobbies}
                  info="Please use comma separated values (eg.
                      hiking, bowling, sewing"
                />
                <TextFieldGroup
                  placeholder="* Bucket List"
                  name="bucketlist"
                  value={this.state.bucketlist}
                  onChange={this.onChange}
                  error={errors.bucketlist}
                  info="Please use comma separated values (eg.
                      skydiving, going to paris, beat a world record"
                />

                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div>
                  <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                  />

                  <InputGroup
                    placeholder="Facebook Page URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                  />

                  <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                  />

                  <InputGroup
                    placeholder="Instagram Page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-block mt-4 text-white"
                  style={{ backgroundColor: '#1f0891' }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));

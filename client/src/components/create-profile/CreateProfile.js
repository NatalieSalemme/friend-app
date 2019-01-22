import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
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
              <h1 className="display-4 text-center mt-5">
                Create Your Profile
              </h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));

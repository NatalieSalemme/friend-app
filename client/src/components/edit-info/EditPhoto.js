import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto } from '../../actions/authActions';
import { updateAvatarStatus } from '../../actions/profileActions';

class EditPhoto extends Component {
  onSubmit = e => {
    // e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append('avatar', e.target.avatar.files[0]);
    this.props.uploadPhoto(bodyFormData);
    this.props.updateAvatarStatus();
  };
  render() {
    const { profile } = this.props.profile;

    let avatar;
    if (profile) {
      if (!profile.user.avatar) {
        avatar = require('../images/anonymous.jpg');
      } else {
        avatar = `http://localhost:3000/api/users/${profile.user._id}/avatar`;
      }
    }
    // let avatar;
    // if (profile.user.avatar === undefined) {
    //   avatar = require('../images/anonymous.jpg');
    // } else {
    //   avatar = `http://localhost:3000/api/users/${profile.user._id}/avatar`;
    // }
    // let avvie = `http://localhost:3000/api/users/${profile.user._id}/avatar`;

    return (
      <div>
        <h1 className="text-center my-5">Edit Profile Photo</h1>

        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="col-md-6 col-form-label mb-3 mx-auto">
            <input
              ref="avatar"
              type="file"
              name="avatar"
              id="avatar"
              className="custome-file-input avatar"
            />
            <label htmlFor="avatar" className="custom-file-label">
              Choose File
            </label>
          </div>
          <div className="text-center">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
        <div className="col-md-12">
          <div className="row">
            <img
              className="mx-auto my-2"
              src={avatar}
              alt="avatar"
              style={{ width: '250px', height: '250px' }}
            />
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
  { uploadPhoto, updateAvatarStatus }
)(EditPhoto);

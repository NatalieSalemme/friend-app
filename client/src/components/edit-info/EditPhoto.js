import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPhoto } from '../../actions/authActions';

class EditPhoto extends Component {
  onSubmit = e => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append('avatar', e.target.avatar.files[0]);
    this.props.uploadPhoto(bodyFormData);
    console.log('submitted');
  };
  render() {
    return (
      <div>
        <h1 className="text-center my-5">Edit Profile Photo</h1>
        <img
          className="mx-auto my-2"
          src="http://localhost:3000/api/users/5c838667f2046c0772aeada8/avatar"
        />
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
      </div>
    );
  }
}

export default connect(
  null,
  { uploadPhoto }
)(EditPhoto);

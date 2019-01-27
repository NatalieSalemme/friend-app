import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { submitPhoto } from '../../actions/profileActions';

class EditPhoto extends Component {
  onSubmit = e => {
    e.preventDefault();
    console.log('submitted');
  };
  render() {
    return (
      <div>
        <h1 className="text-center my-5">Edit Profile Photo</h1>
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className="col-md-6 col-form-label mb-3 mx-auto">
            <input
              type="file"
              name="file"
              id="file"
              className="custome-file-input"
            />
            <label htmlFor="file" className="custom-file-label">
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
  null
  // { profileActions }
)(EditPhoto);

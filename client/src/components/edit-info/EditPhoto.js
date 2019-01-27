import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { submitPhoto } from '../../actions/profileActions';

class EditPhoto extends Component {
  onSubmit = e => {
    e.preventDefault();
    console.log(e);
  };
  render() {
    return (
      <div>
        <h1 className="text-center my-5">Edit photos here</h1>
        <form action="/upload" method="POST" encType="multipart/form-data">
          <div className="custom-file mb-3">
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
          <input type="submit" value="submit" className="btn btn-primary " />
        </form>
      </div>
    );
  }
}

export default connect(
  null
  // { profileActions }
)(EditPhoto);

import React, { Component } from 'react';

class EditPhoto extends Component {
  render() {
    return (
      <div>
        <h1>Edit photos here</h1>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <div className="custom-file mb-3">
            <input
              type="file"
              name="file"
              id="file"
              className="custome-file-input"
            />
            <label for="file" className="custom-file-label">
              Choose File
            </label>
          </div>
          <input
            type="submit"
            value="submit"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    );
  }
}

export default EditPhoto;

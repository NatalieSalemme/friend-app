import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.major}</td>
        <td>{edu.year}</td>
        <td>
          <button
            onClick={() => this.onDeleteClick(edu._id)}
            className="btn btn-danger ml-5"
            style={{ marginRight: '-3em' }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div className="col-md-10 bg-white mt-3 py-3 border">
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Graduated</th>
              <th />
            </tr>
            {education.length === 0 ? (
              <tbody className="text-muted">
                <tr>
                  <td>None</td>
                </tr>
              </tbody>
            ) : (
              education
            )}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducation }
)(Education);

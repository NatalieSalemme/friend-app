import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    const educationInfo =
      education.length === 0 ? (
        <p className="text-muted">None</p>
      ) : (
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Year</th>
            <th />
          </tr>
          {education}
        </thead>
      );

    return (
      <div className="col-md-10">
        <h4 className="mb-4">My Education </h4>
        <table className="table">{educationInfo}</table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(
  null,
  { deleteEducation }
)(Education);

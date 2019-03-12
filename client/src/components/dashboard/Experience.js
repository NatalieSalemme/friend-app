import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.title}</td>
        <td>{exp.company}</td>
        <td>
          <button
            onClick={() => this.onDeleteClick(exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    const experienceInfo =
      experience.length === 0 ? (
        <div className="text-muted">None</div>
      ) : (
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th />
          </tr>
          {experience}
        </thead>
      );
    return (
      <div className=" col-md-10 bg-white py-3 border">
        <h4 className="mb-4">My Experience </h4>
        <table className="table">{experienceInfo}</table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};
export default connect(
  null,
  { deleteExperience }
)(Experience);

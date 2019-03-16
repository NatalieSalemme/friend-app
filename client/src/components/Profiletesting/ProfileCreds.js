import React, { Component } from 'react';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>

        <p>
          <strong>Position:</strong> {exp.title}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>

        <p>
          <strong>Major:</strong> {edu.major}
        </p>
        <p>
          <strong>Year:</strong> {edu.year}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          {expItems.length > 0 ? (
            <div className="text-left">
              <h3 className="font-weight-bold">
                Work / Volunteer
                <i className="fas fa-briefcase ml-4" />
              </h3>

              <ul className="list-group">{expItems}</ul>
            </div>
          ) : (
            <p className="text-center mt-5">No Experience Listed</p>
          )}
        </div>

        <div className="col-md-6">
          {eduItems.length > 0 ? (
            <div className="text-left">
              <h3 className="font-weight-bold">
                Education
                <i className="fas fa-graduation-cap ml-4" />
              </h3>

              <ul className="list-group">{eduItems}</ul>
            </div>
          ) : (
            <p className="text-center mt-5">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;

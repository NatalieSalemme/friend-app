import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="btn-group list-group col-md-3">
      <Link to="/edit-profile" className="btn btn-light text-left">
        <i className="fas fa-edit text-info mr-1 list-group-item " />
        Edit Profile
      </Link>
      <Link to="/edit-account" className="btn btn-light text-left">
        <i className="fas fa-user-edit text-info mr-1 list-group-item" />
        Edit Account
      </Link>
      <Link to="/users/me/avatar" className="btn btn-light text-left">
        <i className="fas fa-camera text-info mr-1 list-group-item" />
        Edit Photo
      </Link>
      <Link to="/add-experience" className="btn btn-light text-left">
        <i className="fab fa-black-tie text-info mr-1 list-group-item" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light text-left">
        <i className="fas fa-graduation-cap text-info mr-1 list-group-item" />
        Add Education
      </Link>
    </div>
  );
};
export default ProfileActions;

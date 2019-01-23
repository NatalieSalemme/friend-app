import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    console.log(profile);
    return (
      // <div classNameName="card card-body bg-light mb-3">
      //   <div classNameName="row">
      //     <div classNameName="col-2">
      //       <Link to={`/profile/${profile.handle}`}>
      //         <img
      //           classNameName="img-thumbnail mr-3"
      //           src={require('../images/rose.jpg')}
      //           alt="avatar"
      //         />
      //       </Link>
      //     </div>
      //     <div classNameName="col-lg-6 col-md-4 col-8">
      //       <h3>{profile.user.name}</h3>
      //       <p>
      //         {profile.status}{' '}
      // {isEmpty(profile.company) ? null : (
      //   <span>at {profile.company}</span>
      // )}
      //       </p>
      // <Link
      //   to={`/profile/${profile.handle}`}
      //   classNameName="btn text-white"
      //   style={{ backgroundColor: '#1f0891' }}
      // >
      //   View Profile
      // </Link>
      //     </div>
      //     <div classNameName="col-md-4 d-none d-md-block">
      //       <h4>Hobbies</h4>
      //       <ul classNameName="list-group">
      // {profile.hobbies.slice(0, 4).map((hobby, index) => (
      //   <li key={index} classNameName="list-group-item">
      //     {hobby}
      //   </li>
      // ))}
      //       </ul>
      //       <ul classNameName="list-group">
      // {profile.bucketlist.slice(0, 4).map((bucketlist, index) => (
      //   <li key={index} classNameName="list-group-item">
      //     {bucketlist}
      //   </li>
      // ))}
      //       </ul>
      //     </div>
      //   </div>
      // </div>
      <div className="card">
        <Link
          to={`/profile/${profile.handle}`}
          classNameName="btn text-white"
          style={{ backgroundColor: '#1f0891' }}
        >
          <img
            className="card-img-top img-thumbnail"
            // style={{ height: '100px', width: '100px' }}
            src={require('../images/rose.jpg')}
            alt="Card image cap"
          />
        </Link>

        <div className="card-body">
          <h5
            className="card-title list-group-item text-center text-white"
            style={{ backgroundColor: '#1f0891' }}
          >
            {profile.user.name}
          </h5>
        </div>

        <ul className="list-group list-group-flush  ">
          <li className="card-text list-group-item ">
            Status: "{profile.status}"
          </li>
          <li className="list-group-item">{profile.location}</li>
        </ul>
      </div>
    );
  }
}
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};
export default ProfileItem;

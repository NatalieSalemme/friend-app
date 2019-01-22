import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    console.log('logging out');
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
 <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#6351ce' }}>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link to="/" className="navbar-brand" >Friend Search</Link>
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <Link to="/" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
        <Link to="/feed" className="nav-link" >Post Feed</Link>
      </li>
      <li className="nav-item active">
        <Link to="/dashboard" className="nav-link" > Dashboard</Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-dark my-2 my-sm-0 text-white" type="submit"  style={{ backgroundColor: '#1f0891' }}>Search</button>
    </form>
    <div className="nav-item">
      {user.avatar && (
        <img
          className="rounded-circle"
          src={user.avatar}
          alt={user.name}
          style={{ width: '25px', marginRight: '5px' }}
          title="You must have a Gravatar connected to your email to display an image"
        />
      )}
    </div>
    <div className="nav-item ">
      <a
        href="#"
        onClick={this.onLogoutClick}
        className="nav-link text-white mx-5"
      >
        Logout
      </a>
    </div>
  </div>
</nav>
    );

    const guestLinks = (
      // <nav
      //   classNameName="navbar navbar-expand-sm"
      //   style={{ backgroundColor: '#6351ce' }}
      // >
      //   <ul>
      //     <Link to="/" className="navbar-brand text-white">
      //       Friend Search
      //     </Link>
      //     <li className="nav-item">
      //       <Link
      //         to="/"
      //         className="nav-link disabled text-white"
      //         href="delete.html"
      //         tabIndex="-1"
      //         aria-disabled="true"
      //       >
      //         Sign Up
      //       </Link>
      //     </li>
      //     <li className="nav-item">
      //       <Link
      //         to="/login"
      //         className="nav-link disabled text-white"
      //         href="delete.html"
      //         tabIndex="-1"
      //         aria-disabled="true"
      //       >
      //         Login
      //       </Link>
      //     </li>
      //   </ul>
      // </nav>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#6351ce' }}>
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
         <Link to="/" className="navbar-brand" >Friend Search</Link>
         <div className="navbar-nav mr-auto mt-2 mt-lg-0" />


         <div className="nav-item active ">
           <Link to="/" className="nav-link text-white" > Sign Up</Link>
         </div>

         <div className="nav-item active mr-5">
          <Link to="/login" className="nav-link text-white" > Log In</Link>
         </div>


       </div>
     </nav>
    );
    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

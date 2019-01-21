import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (

        <ul className="navbar-nav ml-auto auth-links-container">

          <Link to="/" className="navbar-brand text-white">
            Friend Search
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/feed">
                Post Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                Dashboard
              </Link>
            </li>



          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-dark my-2 my-sm-0 text-white"
              type="submit"
              style={{ backgroundColor: '#1f0891' }}
            >
              Search
            </button>
          </form>

          <li className="nav-item">
          {user.avatar && (
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />
          )}
        </li>
          <li className="nav-item">
            <a href="" onClick={this.onLogoutClick} className="nav-link text-white">
              Logout
            </a>
          </li>

      </ul>

    );

    const guestLinks = (
      <ul>
        <Link to="/" className="navbar-brand text-white">
          Friend Search
        </Link>
        <li className="nav-item">
          <Link
            to="/login"
            className="nav-link disabled text-white"
            href="delete.html"
            tabIndex="-1"
            aria-disabled="true"
          >
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav
        className="navbar navbar-expand-sm"
        style={{ backgroundColor: '#6351ce' }}
      >


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    );
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

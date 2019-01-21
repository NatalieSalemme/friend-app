import React, { Component } from 'react';
import Register from '../auth/Register';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container ">
            <div className="row">
              <div className="col-md-12 text-center mt-5 landing-info-container" >
                <h1 className="display-3 mb-4">Friend Search</h1>
                <p className="lead" style={{margin: '-1.2em 0 1.6em 0'}}>
                  {' '}
                Stay connected with friends, meet someone new, reunite with an old friend!
                </p>
                <hr />
                {/* <img src={require('../images/friends.jpg')} style={{height: '300px', width: '400px', opacity: 1.0}}/> */}
                {this.props.children}
                {/* <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;

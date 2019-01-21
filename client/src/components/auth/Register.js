import React, { Component } from 'react';
import Landing from '../layout/Landing';
import { Link } from 'react-router-dom';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(newUser);
  }
  render() {
    return (
      <div>
        <Landing>
          <h3 style={{ marginTop: '-1em' }}>Sign Up</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group col-md-6 mx-auto">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6 mx-auto">
              <input
                type="email"
                className="form-control "
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                  onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6 mx-auto">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={this.state.password}
                  onChange={this.onChange}
              />
            </div>
            <div className="form-group col-md-6 mx-auto">
              <input
                type="password"
                className="form-control"

                name="password2"
                placeholder="Confirm password"
                value={this.state.password2}
                  onChange={this.onChange}
              />
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="register-check"
              />
              <label className="form-check-label" htmlFor="register-check">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: '1.5em' }}
            >
              Create Account
            </button>
          </form>
          <p>
            Already have an account?
            <Link to="/login" className="ml-2 font-weight-bold text-primary">
              Login here
            </Link>
          </p>
        </Landing>
      </div>
    );
  }
}

export default Register;

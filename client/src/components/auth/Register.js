import React, { Component } from 'react';
import Landing from '../layout/Landing';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import axios from 'axios';

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
    axios.post('/api/users/register', newUser)
    .then(res => console.log(res.data))
    .catch(err => this.setState({
      errors: err.response.data
    }))
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Landing>
          <h3 style={{ marginTop: '-1em' }}>Sign Up</h3>
          <form onSubmit={this.onSubmit} noValidate>
            <div className="form-group col-md-6 mx-auto">
              <input
                type="text"
                className={classnames('form-control', {
                  'is-invalid': errors.name
                })}
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.onChange}
              />
              {errors.name && (<div className="invalid-feedback text-left font-weight-bold">{errors.name}</div>)}
            </div>
            <div className="form-group col-md-6 mx-auto">
              <input
                type="email"
                className={classnames('form-control', {
                  'is-invalid': errors.email
                })}
                name="email"
                placeholder="Enter email"
                value={this.state.email}
                  onChange={this.onChange}
              />
                {errors.email && (<div className="invalid-feedback text-left font-weight-bold">{errors.email}</div>)}
            </div>
            <div className="form-group col-md-6 mx-auto">
              <input
                type="password"
                className={classnames('form-control', {
                  'is-invalid': errors.password
                })}
                name="password"
                placeholder="Password"
                value={this.state.password}
                  onChange={this.onChange}
              />
                {errors.password && (<div className="invalid-feedback text-left font-weight-bold">{errors.password}</div>)}
            </div>
            <div className="form-group col-md-6 mx-auto">
              <input
                type="password"
                className={classnames('form-control', {
                  'is-invalid': errors.password2
                })}

                name="password2"
                placeholder="Confirm password"
                value={this.state.password2}
                  onChange={this.onChange}
              />
                {errors.password2 && (<div className="invalid-feedback text-left font-weight-bold">{errors.password2}</div>)}
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

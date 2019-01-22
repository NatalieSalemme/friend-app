import React, { Component } from 'react';
import Landing from '../layout/Landing';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';



class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  };

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

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
    this.props.registerUser(newUser, this.props.history);

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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));

import React, { Component } from 'react';
import Landing from '../layout/Landing';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }
componentDidMount() {
  if(this.props.auth.isAuthenticated) {
    this.props.history.push('/dashboard');
  }
}

componentWillReceiveProps(nextProps) {
  if(nextProps.auth.isAuthenticated) {
    this.props.history.push('/dashboard');
  }
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Landing>
          <h3 style={{ marginTop: '-1em' }}>Login</h3>
          <form onSubmit={this.onSubmit} noValidate>
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

            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: '1.5em' }}
            >
              Login
            </button>
          </form>
          <p>
            Don't have an account yet?
            <Link to="/" className="ml-2 font-weight-bold text-primary">
              Register here
            </Link>
          </p>
        </Landing>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);

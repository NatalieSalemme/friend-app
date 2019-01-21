import React, { Component } from 'react';
import Landing from '../layout/Landing';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(user);
  }
  render() {
    return (
      <div>
        <Landing>
          <h3 style={{ marginTop: '-1em' }}>Login</h3>
          <form onSubmit={this.onSubmit}>
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

export default Login;

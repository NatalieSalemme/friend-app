import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InputGroup from '../common/InputGroup';

import { getCurrentUser, updateUser } from '../../actions/authActions';

class EditAccount extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
    submitted: false,
  };
  componentDidMount() {
    this.props.getCurrentUser();
    this.setState({
      submitted: false,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.auth) {
      let user = nextProps.auth.user;

      //Set components field state
      this.setState({
        name: user.name,
        email: user.email,
      });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.updateUser(userData);
    this.setState({
      submitted: true,
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { errors, submitted } = this.state;
    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center mt-5 mb-5">
                  Edit Account
                </h1>

                {submitted && Object.values(errors).length > 0 && (
                  // (errors.name ||
                  // errors.email ||
                  // errors.password ||
                  // errors.password2)
                  <div className="alert alert-danger" role="alert">
                    Uh-oh! There was an error submitting your form
                  </div>
                )}
                {submitted && Object.values(errors).length === 0 ? (
                  // !errors.name &&
                  // !errors.email &&
                  // !errors.password &&
                  // !errors.password2 &&
                  <div className="alert alert-success" role="alert">
                    Success! Your account details have been updated
                  </div>
                ) : null}
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <InputGroup
                    placeholder="* Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <InputGroup
                    placeholder="* Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <InputGroup
                    placeholder="* Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <InputGroup
                    placeholder="* Confirm Password"
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />

                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-block mt-4 text-white"
                    style={{ backgroundColor: '#1f0891' }}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { getCurrentUser, updateUser }
)(withRouter(EditAccount));

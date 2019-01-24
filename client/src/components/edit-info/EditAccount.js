import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { getCurrentUser, updateUser } from '../../actions/authActions';

class EditAccount extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  };
  componentDidMount() {
    this.props.getCurrentUser();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.auth) {
      let user = nextProps.auth.profile;
      let username = nextProps.auth.user;
      user.name = user.name;
      user.email = user.email;
      // user.password = user.password;
      // user.password2 = user.password2;
      console.log('user is ', user);

      //Set components field state
      this.setState({
        name: user.name,
        email: user.email,
        // password: user.password,
        password2: user.password2,
      });
    }
    // console.log(nextProps);
  }
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.updateUser(userData, this.props.history);
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center mt-5 mb-5">
                  Edit Account
                </h1>

                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextFieldGroup
                    placeholder="* Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="* Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
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
});
export default connect(
  mapStateToProps,
  { getCurrentUser, updateUser }
)(withRouter(EditAccount));

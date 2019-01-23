import React, { Component } from 'react';
import Landing from '../layout/Landing';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { editUser } from '../../actions/authActions';

class EditAccount extends Component {
  state = {
    name: '',
    // email: '',
    // password: '',
    // password2: '',
    errors: {},
  };

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard');
    // }
    this.setState({
      name: this.props.auth.user.name,
    });
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps', nextProps.auth.user);
  //   if (nextProps) {
  //     this.setState({
  //       name: nextProps.auth.user.name,
  //     });
  //   }
  // }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.editUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    console.log(this.props.auth);
    return (
      <div>
        <h1 className="my-5 text-center">Edit Account</h1>
        <form onSubmit={this.onSubmit} noValidate>
          <div className="form-group col-md-6 mx-auto">
            <input
              type="text"
              className={classnames('form-control', {
                'is-invalid': errors.name,
              })}
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {errors.name && (
              <div className="invalid-feedback text-left font-weight-bold">
                {errors.name}
              </div>
            )}
          </div>
          {/* <div className="form-group col-md-6 mx-auto">
            <input
              type="email"
              className="form-control"
              className={classnames('form-control', {
                'is-invalid': errors.email,
              })}
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (
                <div className="invalid-feedback text-left font-weight-bold">
                  {errors.email}
                </div>
              )}
          </div> */}
          {/* <div className="form-group col-md-6 mx-auto">
            <input
              type="password"
              className={classnames('form-control', {
                'is-invalid': errors.password,
              })}
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback text-left font-weight-bold">
                {errors.password}
              </div>
            )}
          </div>
          <div className="form-group col-md-6 mx-auto">
            <input
              type="password"
              className={classnames('form-control', {
                'is-invalid': errors.password2,
              })}
              name="password2"
              placeholder="Confirm password"
              value={this.state.password2}
              onChange={this.onChange}
            />
            {errors.password2 && (
              <div className="invalid-feedback text-left font-weight-bold">
                {errors.password2}
              </div>
            )} */}
          {/* </div> */}
          <div className="col-md-6 mx-auto">
            <button type="submit" className="btn btn-primary mx-auto mt-3">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { editUser }
)(withRouter(EditAccount));

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// // import PropTypes from 'prop-types';
// // import isEmpty from '../../validation/is-empty';
// import { createUser } from '../../actions/authActions';
// import TextFieldGroup from '../common/TextFieldGroup';
//
// class EditAccount extends Component {
//   state = {
//     name: '',
//     errors: {},
//   };
//   // componentDidMount() {
//   //   this.props.getCurrentProfile();
//   // }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors,
//       });
//     }
//     if (nextProps.auth.user) {
//       const user = nextProps.auth.user;
//       console.log('user is', user);
//     }
//   }
//
//   onSubmit = e => {
//     e.preventDefault();
//     const userData = {
//       name: this.state.name,
//     };
//     this.props.createUser(userData, this.props.history);
//   };
//
//   onChange = e => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };
//
//   render() {
//     const { auth } = this.props.auth;
//     const { errors } = this.state;
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-8 m-auto">
//             <h1 className="text-center mt-5">Edit Account</h1>
//             <form onSubmit={this.onSubmit}>
//               <TextFieldGroup
//                 placeholder="* Name"
//                 name="name"
//                 value={this.state.name}
//                 onChange={this.onChange}
//                 error={errors.name}
//                 info="Your first and last name"
//               />
//               <input
//                 type="submit"
//                 value="Submit"
//                 className="btn btn-block mt-4 text-white"
//                 style={{ backgroundColor: '#1f0891' }}
//               />
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors,
// });
// export default connect(
//   mapStateToProps,
//   { createUser }
// )(withRouter(EditAccount));

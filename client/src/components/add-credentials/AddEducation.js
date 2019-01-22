import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  state = {
    school: '',
    major: '',
    year: '',
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      major: this.state.major,
      year: this.state.year,
    };
    this.props.addEducation(eduData, this.props.history);
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 md-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Major"
                  name="major"
                  value={this.state.major}
                  onChange={this.onChange}
                  error={errors.major}
                />
                <TextFieldGroup
                  placeholder="* Year"
                  name="year"
                  value={this.state.year}
                  onChange={this.onChange}
                  error={errors.year}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-block text-white mt-4"
                  style={{ backgroundColor: '#1f0891' }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));

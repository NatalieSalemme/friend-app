import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
    };
  }
  //Does the error checking
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: this.state.avatar,
    };

    this.props.addPost(newPost);
    this.setState({ text: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3 col-md-8 mx-auto ">
        <h1 className="text-center mb-5">My Feed</h1>
        <div className="card card-info">
          <div
            className="card-header text-white"
            style={{ backgroundColor: '#1f0891' }}
          >
            What's On Your Mind?{' '}
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                  avatar={this.state.avatar}
                />
              </div>
              <button
                type="submit"
                className="btn text-white"
                style={{ backgroundColor: '#1f0891' }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// PostForm.propTypes = {
//   addPost: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileCommentItem from './ProfileCommentItem';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { addProfileComment } from '../../actions/profileActions';

class ProfileComments extends Component {
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
    let handle = this.props.profile.profile.handle;
    const { user } = this.props.auth;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: this.state.avatar,
    };

    this.props.addProfileComment(newComment, handle);
    this.setState({ text: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log('profile component rerendered');
    const { errors } = this.state;
    const { profile } = this.props.profile;

    const commentList = profile.comments.map(comment => (
      <ProfileCommentItem key={comment._id} comment={comment} />
    ));
    return (
      <div className="post-form mb-3 col-md-8 mx-auto ">
        <h1 className="text-center mb-5">Comments</h1>
        <div className="card card-info">
          <div
            className="card-header text-white"
            style={{ backgroundColor: '#1f0891' }}
          >
            Post a Comment{' '}
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
        {commentList}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { addProfileComment }
)(ProfileComments);

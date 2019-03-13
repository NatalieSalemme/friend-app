import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  deleteComment,
  addCommentLike,
  // removeLike,
} from '../../actions/postActions';

class CommentItem extends Component {
  onLikeClick = commentId => {
    this.props.addCommentLike(this.props.postId, commentId);
  };

  onUnlikeClick = id => {
    this.props.removeLike(id);
  };

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { comment, postId, auth } = this.props;
    const { profile, loading } = this.props.profile;
    // console.log('commentItem', comment._id);
    let content;
    console.log('profile comment ****', profile);
    console.log('comment ***', comment);
    if (profile === null || loading) {
      // content = <Spinner />;
      content = null;
    } else {
      let avatar;
      if (comment.user.avatar === undefined) {
        avatar = require('../images/anonymous.jpg');
      } else {
        avatar = `http://localhost:3000/api/users/${comment.user}/avatar`;
      }
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        content = (
          <div>
            <Link to={`/profile/${profile.handle}`}>
              {/* <img
                className=" mr-4"
                style={{ width: '70px', height: '70px' }}
                src={require('../images/rose.jpg')}
                alt="avatar"
              /> */}
              <img
                className=" mr-4"
                src={avatar}
                alt="avatar"
                style={{ width: '70px', height: '70px' }}
              />
            </Link>
          </div>
        );
      } else {
        // User is logged in but has no profile
        content = null;
      }
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <br />
            <div className="text-center">
              {content}
              <h4>{comment.name}</h4>
            </div>
          </div>
          <div className="row">
            <button
              onClick={() => this.onLikeClick(comment._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={classnames('fas fa-thumbs-up', {
                  'text-info': this.findUserLike(comment.likes),
                })}
              />

              <span className="badge badge-light">{comment.likes.length}</span>
            </button>
            <button
              onClick={() => this.onUnlikeClick(comment._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={() => this.onDeleteClick(postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { deleteComment, addCommentLike }
)(CommentItem);

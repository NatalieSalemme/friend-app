import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { comment, postId, auth } = this.props;
    const { profile, loading } = this.props.profile;

    let content;
    if (profile === null || loading) {
      // content = <Spinner />;
      content = null;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        content = (
          <div>
            <Link to={`/profile/${profile.handle}`}>
              <img
                className=" mr-4"
                style={{ width: '70px', height: '70px' }}
                src={require('../images/rose.jpg')}
                alt="avatar"
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
            {/* <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a> */}

            <br />
            <div className="text-center">
              {content}
              <h4>{comment.name}</h4>
            </div>
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
  { deleteComment }
)(CommentItem);

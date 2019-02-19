import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteProfileComment,
  addProfileCommentLike,
  unlikeProfileComment,
} from '../../actions/profileActions';

class ProfileCommentItem extends Component {
  onDeleteClick = (handle, id) => {
    this.props.deleteProfileComment(handle, id);
  };
  onProfileLikeClick = commentId => {
    this.props.addProfileCommentLike(
      this.props.profile.profile.handle,
      commentId
    );
  };
  onProfileUnlikeClick = commentId => {
    this.props.unlikeProfileComment(
      this.props.profile.profile.handle,
      commentId
    );
  };
  render() {
    const { comment, showActions, auth, profile } = this.props;

    return (
      <div className="card card-body my-3 col-md-11 mx-auto">
        <div className="row">
          <div className="col-md-3">
            <Link to={`/profile/${comment.user}`}>
              <img
                // onClick={id => this.onPhotoClick(comment.user)}
                className="rounded-circle d-none d-md-block mx-auto"
                src={require('../images/rose.jpg')}
                style={{ width: '75px', height: '75px' }}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>

          <div className="col-md-9">
            <p>{comment.text}</p>
            {showActions ? (
              <span>
                <div className="row">
                  <button
                    onClick={() => this.onProfileLikeClick(comment._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className="fas fa-thumbs-up"
                      // className={classnames('fas fa-thumbs-up', {
                      //   'text-info': this.findUserLike(comment.likes),
                      // })}
                    />

                    <span className="badge badge-light">
                      {comment.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={() => this.onProfileUnlikeClick(comment._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                </div>
                <div className="row mt-3">
                  {comment.user === auth.user.id ? (
                    <button
                      onClick={() =>
                        this.onDeleteClick(profile.profile.handle, comment._id)
                      }
                      type="button"
                      className="btn btn-danger ml-2"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </div>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
ProfileCommentItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(
  mapStateToProps,
  { deleteProfileComment, addProfileCommentLike, unlikeProfileComment }
)(ProfileCommentItem);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

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
  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { comment, showActions, auth, profile } = this.props;

    let commentDate = comment.date.toString();
    console.log(commentDate);
    return (
      <div className="card card-body mb-3 col-md-12 mx-auto my-2">
        <div className="row">
          <div className="col-md-2">
            <Link to={`profile/user/${comment.user}`}>
              <img
                onClick={id => this.onPhotoClick(comment.user)}
                className="rounded-circle d-none d-md-block"
                src={require('../images/rose.jpg')}
                style={{ width: '75px', height: '75px' }}
                alt=""
              />
            </Link>

            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <div className="row d-flex justify-content-end">
              <p className="pr-3 mt-2 font-weight-bold">
                {' '}
                {moment(commentDate).format('MM/DD/YYYY LT')}
              </p>
              {comment.user === auth.user.id ? (
                <button
                  onClick={() =>
                    this.onDeleteClick(profile.profile.handle, comment._id)
                  }
                  type="button"
                  className="btn btn-danger mx-2"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </div>
            <p className="mr-3 pb-4">{comment.text}</p>

            {showActions ? (
              <span>
                <div className="row">
                  <button
                    onClick={() => this.onProfileLikeClick(comment._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(comment.likes),
                      })}
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

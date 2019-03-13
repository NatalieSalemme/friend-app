import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {
  deleteComment,
  addCommentLike,
  removeCommentLike,
} from '../../actions/postActions';

class CommentItem extends Component {
  onLikeClick = commentId => {
    this.props.addCommentLike(this.props.postId, commentId);
  };

  onUnlikeClick = commentId => {
    this.props.removeCommentLike(this.props.postId, commentId);
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
    let showActions = true;
    let content;
    let avatar;
    let commentDate = comment.date.toString();
    console.log('comment ***', comment);
    if (profile === null || loading) {
      // content = <Spinner />;
      content = null;
    } else {
      if (comment.avatar) {
        avatar = `http://localhost:3000/api/users/${comment.user}/avatar`;
      } else {
        avatar = require('../images/anonymous.jpg');
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
      <div className="card card-body mb-3 col-md-8 mx-auto">
        <div className="row">
          <div className="col-md-2">
            <Link to={`profile/user/${comment.user}`}>
              {/* <img
                onClick={id => this.onPhotoClick(post.user)}
                className="rounded-circle d-none d-md-block"
                src={require('../images/rose.jpg')}
                style={{ width: '75px', height: '75px' }}
                alt=""
              /> */}
              <img
                className="rounded-circle d-non d-md-block"
                src={avatar}
                alt="avatar"
                style={{ width: '75px', height: '75px' }}
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
                  onClick={() => this.onDeleteClick(comment._id)}
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
                    onClick={() => this.onLikeClick(comment._id)}
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
                    onClick={() => this.onUnlikeClick(comment._id)}
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

//     return (
//       <div className="card card-body mb-3">
//         <div className="row">
//           <div className="col-md-2">
//             <br />
//             <div className="text-center">
//               {content}
//               <h4>{comment.name}</h4>
//             </div>
//           </div>
//           <div className="row">
//             <button
//               onClick={() => this.onLikeClick(comment._id)}
//               type="button"
//               className="btn btn-light mr-1"
//             >
//               <i
//                 className={classnames('fas fa-thumbs-up', {
//                   'text-info': this.findUserLike(comment.likes),
//                 })}
//               />
//
//               <span className="badge badge-light">{comment.likes.length}</span>
//             </button>
//             <button
//               onClick={() => this.onUnlikeClick(comment._id)}
//               type="button"
//               className="btn btn-light mr-1"
//             >
//               <i className="text-secondary fas fa-thumbs-down" />
//             </button>
//           </div>
//           <div className="col-md-10">
//             <p className="lead">{comment.text}</p>
//             {comment.user === auth.user.id ? (
//               <button
//                 onClick={() => this.onDeleteClick(postId, comment._id)}
//                 type="button"
//                 className="btn btn-danger mr-1"
//               >
//                 <i className="fas fa-times" />
//               </button>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { deleteComment, addCommentLike, removeCommentLike }
)(CommentItem);

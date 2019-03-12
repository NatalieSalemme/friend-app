import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import { getProfileById } from '../../actions/profileActions';

class PostItem extends Component {
  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  onLikeClick = id => {
    this.props.addLike(id);
  };

  onUnlikeClick = id => {
    this.props.removeLike(id);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  onPhotoClick = id => {
    this.props.getProfileById(id);
  };
  render() {
    const { post, auth, showActions } = this.props;
    let postDate = post.date.toString();
    return (
      <div className="card card-body mb-3 col-md-8 mx-auto">
        <div className="row">
          <div className="col-md-2">
            <Link to={`profile/user/${post.user}`}>
              <img
                onClick={id => this.onPhotoClick(post.user)}
                className="rounded-circle d-none d-md-block"
                src={require('../images/rose.jpg')}
                style={{ width: '75px', height: '75px' }}
                alt=""
              />
            </Link>

            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <div className="row d-flex justify-content-end">
              <p className="pr-3 mt-2 font-weight-bold">
                {' '}
                {moment(postDate).format('MM/DD/YYYY LT')}
              </p>
              {post.user === auth.user.id ? (
                <button
                  onClick={() => this.onDeleteClick(post._id)}
                  type="button"
                  className="btn btn-danger mx-2"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </div>
            <p className="mr-3 pb-4">{post.text}</p>

            {showActions ? (
              <span>
                <div className="row">
                  <button
                    onClick={() => this.onLikeClick(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames('fas fa-thumbs-up', {
                        'text-info': this.findUserLike(post.likes),
                      })}
                    />

                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={() => this.onUnlikeClick(post._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>
                </div>
                <div className="row mt-3">
                  <Link
                    to={`/posts/${post._id}`}
                    className="btn text-white"
                    style={{ backgroundColor: '#1f0891' }}
                  >
                    Comments
                  </Link>
                  {/* <div className="col-md-1">
                    {post.user === auth.user.id ? (
                      <button
                        onClick={() => this.onDeleteClick(post._id)}
                        type="button"
                        className="btn btn-danger ml-2"
                      >
                        <i className="fas fa-times" />
                      </button>
                    ) : null}
                  </div> */}
                </div>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  {
    deletePost,
    addLike,
    removeLike,
    getProfileById,
  }
)(PostItem);

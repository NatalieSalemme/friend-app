import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const { comments, postId, avatar } = this.props;
    return comments.map(comment => (
      <CommentItem
        key={comment._id}
        comment={comment}
        postId={postId}
        avatar={avatar}
      />
    ));
  }
}
CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};
export default CommentFeed;

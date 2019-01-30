import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    let postList = posts.map(post => <PostItem key={post._id} post={post} />);
    return (
      <div>
        <div className="d-inline">{postList}</div>
      </div>
    );
  }
}
PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default PostFeed;

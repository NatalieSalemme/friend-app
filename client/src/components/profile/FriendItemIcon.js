import React, { Component } from 'react';

class FriendItemIcon extends Component {
  render() {
    const { friend } = this.props;
    // console.log('frienditemicon***', friend);
    let content;
    if (!friend) {
      content = 'Loading...';
    } else {
      content = friend.name;
    }
    return <div>{content}</div>;
  }
}

export default FriendItemIcon;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FriendItemIcon extends Component {
  render() {
    const { friend } = this.props;
    // console.log('frienditemicon***', friend.name);
    let content;

    if (!friend) {
      content = '';
    } else {
      let friendUser = friend.user;
      content = (
        <div className="ml-2 text-secondary">
          {/* <Link to={`/profile/user/${friendUser}`} className="text-secondary"> */}
          {/* <p className="text-secondary"> */}
          {friend.name}
          {/* </Link> */}
          {/* </p> */}
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default FriendItemIcon;

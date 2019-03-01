import React, { Component } from 'react';

class AllFriendsItem extends Component {
  render() {
    const { friend } = this.props;
    console.log(friend);
    return (
      <div>
        <h1>{friend ? friend.name : ''}</h1>
      </div>
    );
  }
}

export default AllFriendsItem;

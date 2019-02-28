import React, { Component } from 'react';
import FriendItemIcon from './FriendItemIcon';
import { Link } from 'react-router-dom';

class FriendsListProfile extends Component {
  render() {
    const { profile } = this.props;
    const firstName = profile.user.name.trim().split(' ')[0];
    let mappedFriends;
    console.log(profile.friends);
    if (!profile) {
      return 'Loading...';
    } else {
      mappedFriends = profile.friends.map((friend, i) => (
        <FriendItemIcon key={i} friend={friend} />
      ));
    }

    return (
      <div>
        <h5 className="text-center">
          {firstName} has {profile.friends.length} friends including:
        </h5>
        <ul>{mappedFriends.slice(0, 5)}</ul>

        <h3 className="text-center"> See all Friends</h3>
      </div>
    );
  }
}

export default FriendsListProfile;

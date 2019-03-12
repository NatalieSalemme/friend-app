import React, { Component } from 'react';
import FriendItemIcon from './FriendItemIcon';
import { Link } from 'react-router-dom';

class FriendsListProfile extends Component {
  render() {
    const { profile } = this.props;
    const firstName = profile.user.name.trim().split(' ')[0];
    let mappedFriends;
    if (!profile) {
      return 'Loading...';
    } else {
      mappedFriends = profile.friends.map((friend, i) => (
        <FriendItemIcon key={i} friend={friend} />
      ));
    }
    // console.log('friendsListProfile&&&&', profile);
    return (
      <div>
        <h5 className="text-center">
          {firstName} has {profile.friends.length} friends including:
        </h5>
        <ul>{mappedFriends}</ul>
        <Link to={`/profile/user/friends/${profile.user._id}`}>
          <h3 className="text-center" style={{ color: '#1f0891' }}>
            {' '}
            See all Friends
          </h3>
        </Link>
      </div>
    );
  }
}

export default FriendsListProfile;

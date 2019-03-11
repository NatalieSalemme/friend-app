import React, { Component } from 'react';
// import FriendItemIcon from './FriendItemIcon';
import ProfileItem from '../profiles/ProfileItem';

class FilteredProfilesList extends Component {
  render() {
    const { profiles } = this.props;
    console.log(profiles);

    let mappedResults;
    if (!profiles) {
      return 'Loading...';
    } else {
      mappedResults = profiles.map((profile, i) => (
        <ProfileItem key={i} profile={profile} />
      ));
    }
    return (
      <div>
        <ul>{mappedResults}</ul>
      </div>
    );
  }
}

export default FilteredProfilesList;

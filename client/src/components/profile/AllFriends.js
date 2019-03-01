import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profileActions';
import AllFriendsItem from './AllFriendsItem';

class AllFriends extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  }
  render() {
    const { profile } = this.props.profile;
    // console.log(profile);
    //
    let mapped;
    // console.log('hiiya******', profile);
    // let profileFriends = profile.friends;
    if (profile) {
      mapped = profile.friends.map(friend => (
        <AllFriendsItem friend={friend} />
      ));
    }

    return (
      <div>
        <h1 className="text-center my-5">All Friends</h1>

        <ul>{mapped}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(AllFriends);

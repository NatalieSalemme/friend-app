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
    let firstName;
    let name;
    let friendCount;
    let mapped;
    if (profile) {
      firstName = profile.user.name.trim().split(' ')[0];
      if (firstName.endsWith('s')) {
        name = `${firstName}'`;
      } else {
        name = `${firstName}'s`;
      }
      friendCount = profile.friends.length;
      mapped = profile.friends.map(friend => (
        <AllFriendsItem friend={friend} />
      ));
    }

    return (
      <div
        style={{
          backgroundColor: '#E9EBEE',
          paddingBottom: '5em',
          marginBottom: '-4em',
          border: '2px dotted pink',
          width: '100%',
        }}
      >
        <div className="container">
          <div className="col-md-12">
            <h1 className="text-center py-5">
              {name ? name : 'User'} {friendCount} Friends
            </h1>
          </div>
          <div className="row">
            <div className="card-deck mx-auto">{mapped}</div>
          </div>
        </div>
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

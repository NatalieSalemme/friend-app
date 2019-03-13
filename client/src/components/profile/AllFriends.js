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
      // TODO: error when trying to assign friend id to key
      friendCount = profile.friends.length;
      mapped = profile.friends.map((friend, index) => (
        <AllFriendsItem key={index} friend={friend} />
      ));
    }

    return (
      <div
        style={{
          backgroundColor: '#E9EBEE',
          paddingBottom: '5em',
          marginBottom: '-4em',
          width: '100%',
        }}
      >
        <div className="container col-md-12">
          <div>
            <h1 className="text-center py-5">
              Displaying {name ? name : 'User'} {friendCount} Friends
            </h1>
          </div>
          <div className="row ">
            <div
              className="card-deck mx-auto d-flex justify-content-around"
              style={{ border: '2px dotted blue' }}
            >
              {mapped}
            </div>
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

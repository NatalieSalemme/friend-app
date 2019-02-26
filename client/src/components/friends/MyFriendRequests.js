import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import FriendRequestItem from './FriendRequestItem';
import {
  // getMyFriendRequests
  getProfileById,
} from '../../actions/profileActions';

class MyFriendRequests extends Component {
  // componentDidMount() {
  //   // this.props.getMyFriendRequests();
  //   this.props.getProfileById(this.props.auth.user.id);
  // }
  render() {
    const { profile } = this.props.profile;
    let content;
    if (!profile) {
      content = <Spinner />;
    } else {
      content = profile.friendrequests.map(request => (
        <FriendRequestItem key={request._id} request={request} />
      ));
    }

    //   let content;
    //   let list;
    //
    //   if (!profile && !profile.loading) {
    //     content = 'No profile found';
    //   } else if (profile === null && profile.loading) {
    //     content = <Spinner />;
    //   } else if (profile) {
    //     console.log('&&&&&&profilefriends', profile.profile);

    return (
      <div
        style={{
          backgroundColor: '#E9EBEE',
          paddingBottom: '5em',
          marginBottom: '-3em',
          marginTop: '-1em',
        }}
      >
        <h1 className="text-center p-5">My Friend Requests</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(MyFriendRequests);

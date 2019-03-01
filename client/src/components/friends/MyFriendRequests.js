import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import FriendRequestItem from './FriendRequestItem';
import {
  getMyFriendRequests,
  getProfileById,
} from '../../actions/profileActions';

class MyFriendRequests extends Component {
  // componentDidMount() {
  //   this.props.getMyFriendRequests();
  //   // this.props.getProfileById(this.props.auth.user.id);
  // }
  render() {
    const { profile } = this.props.profile;

    let content;
    let requestsLength;
    if (!profile) {
      // console.log(profile);
      content = <Spinner />;
    } else {
      requestsLength = profile.friendrequests.length;
      console.log(requestsLength);
      content = profile.friendrequests.map(request => (
        <FriendRequestItem key={request._id} request={request} />
      ));
    }

    return (
      <div
        style={{
          backgroundColor: '#E9EBEE',
          paddingBottom: '23em',
          marginBottom: '-3em',

          marginTop: '-1em',
        }}
      >
        <h1 className="text-center pt-5">My Friend Requests</h1>
        <p className="text-muted text-center">
          You have {requestsLength ? requestsLength : 0}{' '}
          {requestsLength === 1 ? 'request' : 'requests'}
        </p>
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
  { getProfileById, getMyFriendRequests }
)(MyFriendRequests);

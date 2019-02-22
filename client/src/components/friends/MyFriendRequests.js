import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getMyFriendRequests } from '../../actions/profileActions';

class MyFriendRequests extends Component {
  componentDidMount() {
    this.props.getMyFriendRequests();
  }
  render() {
    const { profile } = this.props;
    let content;
    let list;

    if (!profile && !profile.loading) {
      content = 'No profile found';
    } else if (profile.loading) {
      content = <Spinner />;
    } else {
      console.log('&&&&&&profilefriends', profile.profile);
    }

    return (
      <div>
        <h1 className="text-center mt-3">My Friend Requests</h1>
        {content}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
});
export default connect(
  mapStateToProps,
  { getMyFriendRequests }
)(MyFriendRequests);

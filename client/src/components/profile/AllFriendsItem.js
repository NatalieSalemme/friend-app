import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllFriendsItem extends Component {
  render() {
    const { friend } = this.props;
    let content;
    if (friend) {
      content = (
        <div className="col-md-3 mx-auto pb-5">
          <div className="card" style={{ width: '220px' }}>
            <Link to={`/profile/user/${friend.user ? friend.user : ''}`}>
              <img
                className=" img-thumbnail card-img-top"
                src={require('../images/rose.jpg')}
                alt="Avatar"
                style={{ width: '220px', height: '190px' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-text text-body">
                {friend ? friend.name : ''}
              </h5>
            </div>
          </div>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default AllFriendsItem;

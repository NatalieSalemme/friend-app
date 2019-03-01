import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllFriendsItem extends Component {
  render() {
    const { friend } = this.props;
    console.log(friend);
    let content;
    if (friend) {
      content = (
        <div className="col-md-3 mx-auto pb-5">
          <Link to={`/profile/user/${friend.user ? friend.user : ''}`}>
            <div className="card" style={{ width: '200px' }}>
              <img
                className=" img-thumbnail card-img-top"
                src={require('../images/rose.jpg')}
                alt="Avatar"
                style={{ width: '200px', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-text">{friend ? friend.name : ''}</h5>
              </div>
            </div>
          </Link>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

export default AllFriendsItem;

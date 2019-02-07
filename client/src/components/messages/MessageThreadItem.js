import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteMessage } from '../../actions/messageActions';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import moment from 'moment';

class MessageThreadItem extends Component {
  onDeleteClick = id => {
    this.props.deleteMessage(id);
  };
  render() {
    const { message } = this.props;
    let messageThreadContent;
    if (!message) {
      messageThreadContent = <Spinner />;
    } else {
      const messageDate = message.date;
      messageThreadContent = (
        <div className="card card-body mb-3 col-md-8 mx-auto">
          <div className="row">
            <div className="col-md-2">
              <br />
              <div className="text-center">
                <Link to={`/profile/user/${message.user}`}>
                  <img
                    className=" mr-4"
                    style={{ width: '70px', height: '70px' }}
                    src={require('../images/rose.jpg')}
                    alt="avatar"
                  />
                </Link>
                <h4>{message.from}</h4>
              </div>
            </div>
            <div className="col-md-10">
              <div className="text-right">
                {moment(messageDate).format('MM/DD/YYYY LT')}
              </div>
              <p className="lead text-left">{message.message}</p>

              <div className="text-right mt-5 pt-2">
                <button
                  onClick={() => this.onDeleteClick(message._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>{messageThreadContent}</div>;
  }
}

export default connect(
  null,
  { deleteMessage }
)(MessageThreadItem);

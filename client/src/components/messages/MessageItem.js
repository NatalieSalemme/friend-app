import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteMessage } from '../../actions/messageActions';

class MessageItem extends React.Component {
  onDeleteClick = id => {
    this.props.deleteMessage(id);
  };
  render() {
    const { message } = this.props;

    let messageDate = message.date.toString();

    return (
      <div className="card card-body mb-3 col-md-8 mx-auto">
        <div className="row">
          <div className="col-md-2">
            {/* <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={comment.avatar}
                  alt=""
                />
              </a> */}

            <br />
            <div className="text-center">
              <img
                className=" mr-4"
                style={{ width: '70px', height: '70px' }}
                src={require('../images/rose.jpg')}
                alt="avatar"
              />
              <h4>{message.from}</h4>
            </div>
          </div>
          <div className="col-md-10">
            <div className="text-right">
              {moment(messageDate).format('MM/DD/YYYY LT')}
            </div>
            <p className="lead text-left">{message.message}</p>

            <div class="d-flex justify-content-between mt-5 pt-2">
              <Link
                to={`/messages/reply/${message._id}`}
                className="btn btn-secondary"
              >
                Reply
              </Link>
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
}

export default connect(
  null,
  { deleteMessage }
)(MessageItem);

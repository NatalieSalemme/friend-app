const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  to: {
    type: String,
  },

  messages: [
    {
      message: String,
      from: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      delivered: Boolean,
      read: Boolean,
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Message = mongoose.model('message', MessageSchema);

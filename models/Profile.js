const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    //associates user by its id
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  bucketlist: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  education: [
    {
      school: {
        type: String,
      },
      major: {
        type: String,
      },
      year: {
        type: String,
      },
    },
  ],
  experience: [
    {
      title: {
        type: String,
      },
      company: {
        type: String,
      },
    },
  ],
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  comments: [
    {
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
      date: {
        type: Date,
        default: Date.now,
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
          },
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

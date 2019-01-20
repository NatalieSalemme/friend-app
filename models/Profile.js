const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
  user: {
    //associates user by its id
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  }
  status: {
    type: String,
    required: true
  },
  hobbies: {
    type: [String],
    required: true
  },
  animals: {
    type: [String]
  },
  countries: {
    type: [String]
  },
  bio: {
    type: String
  },
  education: [
    {
      school: {
        type: String
      },
      major: {
        type: String
      },
      year: {
        type: String
      }
    }
  ],
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

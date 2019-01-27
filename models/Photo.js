const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const PhotoSchema = new Schema({
  user: {
    //associates user by its id
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  avatar: {
    type: String,
  },
});

module.exports = Photo = mongoose.model('photo', PhotoSchema);

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}
// module.exports = {
//   mongoURI: 'mongodb://tatalie:tatalie2@ds161794.mlab.com:61794/friend-search',
//   secretOrKey: 'gajsfkjas',
// };

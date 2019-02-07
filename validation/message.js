const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.message = !isEmpty(data.message) ? data.message : '';
  data.to = !isEmpty(data.to) ? data.to : '';

  if (!Validator.isLength(data.message, { min: 1, max: 3000 })) {
    errors.message = 'Post must be between 1 and 3000 characters';
  }
  if (Validator.isEmpty(data.message)) {
    errors.message = 'message field is required';
  }
  if (Validator.isEmpty(data.to)) {
    errors.to = 'To field is required';
  }

  return { errors, isValid: isEmpty(errors) };
};

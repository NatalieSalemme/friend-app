const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 1, max: 1000 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return { errors, isValid: isEmpty(errors) };
};

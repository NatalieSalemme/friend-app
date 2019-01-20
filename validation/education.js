const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.major = !isEmpty(data.major) ? data.major : '';
  data.year = !isEmpty(data.year) ? data.year : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }
  if (Validator.isEmpty(data.major)) {
    errors.major = 'Major field is required';
  }
  if (Validator.isEmpty(data.year)) {
    errors.year = 'Year field is required';
  }

  return { errors, isValid: isEmpty(errors) };
};

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = 'Name of the School required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Please specify the degree';
  }

  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Enter the field of study';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

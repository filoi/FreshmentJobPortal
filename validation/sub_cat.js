const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCourseInput(data) {
    console.log(data)
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.code = !isEmpty(data.code) ? data.code : '';
   
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Course Feild is Required';
    }

    if (Validator.isEmpty(data.code)) {
        errors.code = 'coursecode Feild is Required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCourseInput(data) {
    console.log(data)
    let errors = {};

    data.course = !isEmpty(data.course) ? data.course : '';
    data.coursecode = !isEmpty(data.coursecode) ? data.coursecode : '';
   
    if (Validator.isEmpty(data.course)) {
        errors.course = 'Course Feild is Required';
    }

    if (Validator.isEmpty(data.coursecode)) {
        errors.coursecode = 'coursecode Feild is Required';
    }

   

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
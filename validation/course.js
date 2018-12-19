const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCourseInput(data) {
    console.log(data)
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.coursecode = !isEmpty(data.coursecode) ? data.coursecode : '';
    data.sub_category = !isEmpty(data.sub_category) ? data.sub_category : '';
   
    if (Validator.isEmpty(data.course)) {
        errors.course = 'Course Feild is Required';
    }

    if (Validator.isEmpty(data.coursecode)) {
        errors.coursecode = 'coursecode Feild is Required';
    }

    if (Validator.isEmpty(data.sub_category)) {
        errors.sub_category = 'sub_category Feild is Required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCollegeInput(data) {
    console.log(data)
    let errors = {};

    data.course_id = !isEmpty(data.course_id) ? data.course_id : '';
    data.subject_id = !isEmpty(data.subject_id) ? data.subject_id : '';


    if (Validator.isEmpty(data.course_id)) {
        errors.course_id = 'course_id Feild is Required';
    }

    if (Validator.isEmpty(data.subject_id)) {
        errors.subject_id = 'subject_id Feild is Required';
    }
 
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
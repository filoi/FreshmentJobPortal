const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateSubjectInput(data) {
    console.log(data)
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.code = !isEmpty(data.code) ? data.code : '';
    data.sub_category_id = !isEmpty(data.sub_category_id) ? data.sub_category_id : '';
    data.course_id = !isEmpty(data.course_id) ? data.course_id : '';
    

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name Feild is Required';
    }

    if (Validator.isEmpty(data.code)) {
        errors.code = 'Code Feild is Required';
    }

    if (Validator.isEmpty(data.sub_category_id)) {
        errors.sub_category_id = 'Sub_category_id Feild is Required';
    }

    if (Validator.isEmpty(data.course_id)) {
        errors.course_id = 'Course_id Feild is Required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
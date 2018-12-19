const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSubjectCategoryInput(data) {
    console.log(data)
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.code = !isEmpty(data.code) ? data.code : '';

    if (!Validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.college = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.code)) {
        errors.code = 'Name Field is Required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.Email = 'Email Field is Required';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
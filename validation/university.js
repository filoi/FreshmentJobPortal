const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUniversityInput(data) {
    console.log(data)
    let errors = {};

    data.university = !isEmpty(data.university) ? data.university : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.mobileno = !isEmpty(data.mobileno) ? data.mobileno : '';

    if (!Validator.isLength(data.university, {
            min: 2,
            max: 30
        })) {
        errors.university = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.university)) {
        errors.university = 'Name field is Required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is Required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.mobileno)) {
        errors.mobileno = 'Mobile No field is Required';
    }

    if (!Validator.isLength(data.mobileno,{
        min:10,
        max:10
    })) {
        errors.mobileno = 'Please enter 10 digit mobile number';
    }

 
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
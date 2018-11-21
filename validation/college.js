const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCollegeInput(data) {
    console.log(data)
    let errors = {};

    data.college = !isEmpty(data.college) ? data.college : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.mobilen = !isEmpty(data.mobile) ? data.mobileno : '';

    if (!Validator.isLength(data.college, {
            min: 2,
            max: 30
        })) {
        errors.college = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.college)) {
        errors.college = 'Name Feild is Required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.Email = 'Email Feild is Required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.Email = 'Email is inValid';
    }

    if (Validator.isEmpty(data.mobileno)) {
        errors.mobileno = 'Mobile No Feild is Required';
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
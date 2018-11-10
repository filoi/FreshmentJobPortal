const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUniversityInput(data) {
    console.log(data)
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.mobile = !isEmpty(data.mobile) ? data.mobile : '';

    if (!Validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name Feild is Required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.Email = 'Email Feild is Required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.Email = 'Email is inValid';
    }

    if (Validator.isEmpty(data.mobile)) {
        errors.mobileno = 'Mobile No Feild is Required';
    }

    if (!Validator.isLength(data.mobile,{
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
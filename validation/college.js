const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCollegeInput(data) {
    console.log(data)
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.mobilen = !isEmpty(data.mobile) ? data.mobileno : '';
    data.university_id = !isEmpty(data.university_id) ? data.university_id : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.code = !isEmpty(data.code) ? data.code : '';


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

    if (Validator.isEmpty(data.mobileno)) {
        errors.mobileno = 'Mobile No Feild is Required';
    }

    if (Validator.isEmpty(data.university_id)) {
        errors.university_id = 'University_id Feild is Required';
    }

    if (Validator.isEmpty(data.year)) {
        errors.year = 'Year Feild is Required';
    }

    if (Validator.isEmpty(data.code)) {
        errors.code = 'Code Feild is Required';
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
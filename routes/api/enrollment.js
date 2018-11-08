const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input Validation
const validateEnrollmentInput = require('../../validation/enrollment');

const User = require('../../models/Enrollment');



//@route GET api/users/register
//@desc Register route
//@access Public
router.post('/enrollmentregister', (req, res) => {

    console.log(req.body);
    const {
        errors,
        isValid
    } = validateEnrollmentInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }


    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email Already exits'
                });
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg',
                    d: 'mm'
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    mobileno:req.body.mobileno,
                    college:req.body.college,
                    course:req.body.course
                });




                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));


            }
        })
})


//@route  GET api/enrollment/all
//@desc  Get all  enrollment
//@access Public
router.get('/all', (req, res) => {

    const errors = {};

    User.find()
        .populate('user', ['name', 'avatar'])
        .then(users => {
            if (!users) {
                errors.noprofiles = 'No Profiles exist';
                return res.status(404).json(errors);
            }

            res.json(users);
        })
        .catch(err => res.status(404).json({
            Profiles: 'Profiles Dosent exits'
        }));
})


module.exports = router;
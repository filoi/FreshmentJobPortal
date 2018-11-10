const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const nodemailer = require('nodemailer');
const {
    google
} = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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
                    mobileno: req.body.mobileno,
                    college: req.body.college,
                    course: req.body.course
                });


                const oauth2Client = new OAuth2(
                    "cleintid",
                    "client Secret key", // Client Secret
                    "https://developers.google.com/oauthplayground" // Redirect URL
                );

                oauth2Client.setCredentials({
                    refresh_token: "refresh token"
                });

                const accessToken = oauth2Client.refreshAccessToken()
                    .then(res => res.credentials.access_token);


                const smtpTransport = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        type: "OAuth2",
                        user: "",
                        clientId: "",
                        clientSecret: "",
                        refreshToken: "",
                        accessToken: accessToken
                    }
                });


                const mailOptions = {
                    from: "rohillavicky172@gmail.com",
                    to: req.body.email,
                    subject: "JobPortal Payment Email: Happy to See you on Jobportal",
                    generateTextFromHTML: true,
                    html: "<h4>Thanks for Enrollment in Jobportal</h4><p>Please visit this link for make payment.</p><a href='http://localhost:3000/' target='_blank'>Here</a>"
                };

                smtpTransport.sendMail(mailOptions, (error, response) => {
                    error ? console.log(error) : console.log(response);
                    smtpTransport.close();
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
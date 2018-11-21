const express = require('express');
const router = express.Router();
//Load Input Validation
const validateCollegeInput = require('../../validation/college');
const College = require('../../models/College');



//@route GET api/college/register
//@desc Register route
//@access Public
router.post('/collegeregister', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateCollegeInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }


    College.findOne({
            email: req.body.email
        })
        .then(college => {
            if (college) {
                return res.status(400).json({
                    email: 'Email Already exits'
                });
            } else {
                const newCollege = new College({
                    name: req.body.college,
                    email: req.body.email,
                    mobileno:req.body.mobileno
                });


                newCollege.save()
                    .then(college => res.json(college))
                    .catch(err => console.log(err));


            }
        })
})


//@route  GET api/college/all
//@desc  Get all  university
//@access Public
router.get('/all', (req, res) => {

    const errors = {};

    College.find()
        .then(college => {
            if (!college) {
                errors.noprofiles = 'No College exist';
                return res.status(404).json(errors);
            }

            res.json(college);
        })
        .catch(err => res.status(404).json({
            college : 'college Dosent exits'
        }));
})


module.exports = router;
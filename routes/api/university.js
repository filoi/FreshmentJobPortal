const express = require('express');
const router = express.Router();
//Load Input Validation
const validateUniversityInput = require('../../validation/university');
const University = require('../../models/University');



//@route GET api/university/register
//@desc Register route
//@access Public
router.post('/universityregister', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateUniversityInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }


    University.findOne({
            email: req.body.email
        })
        .then(university => {
            if (university) {
                return res.status(400).json({
                    email: 'Email Already exits'
                });
            } else {
                const newUniversity = new User({
                    name: req.body.name,
                    email: req.body.email,
                    mobileno:req.body.mobileno
                });


                newUniversity.save()
                    .then(university => res.json(university))
                    .catch(err => console.log(err));


            }
        })
})


//@route  GET api/university/all
//@desc  Get all  university
//@access Public
router.get('/all', (req, res) => {

    const errors = {};

    University.find()
        .then(university => {
            if (!university) {
                errors.noprofiles = 'No University exist';
                return res.status(404).json(errors);
            }

            res.json(university);
        })
        .catch(err => res.status(404).json({
            university : 'University Dosent exits'
        }));
})


module.exports = router;
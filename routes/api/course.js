const express = require('express');
const router = express.Router();
//Load Input Validation
const validateCourseInput = require('../../validation/course');
const Course = require('../../models/Course');



//@route GET api/course/register
//@desc Register route
//@access Public
router.post('/courseregister', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateCourseInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }


    Course.findOne({
            coursecode: req.body.coursecode
        })
        .then(coursecode => {
            if (coursecode) {
                return res.status(400).json({
                    email: 'Course Already exits'
                });
            } else {
                const newCourse = new Course({
                    name: req.body.course,
                    coursecode: req.body.coursecode,
                });


                newCourse.save()
                    .then(course => res.json(course))
                    .catch(err => console.log(err));


            }
        })
})


//@route  GET api/course/all
//@desc  Get all  university
//@access Public
router.get('/all', (req, res) => {

    const errors = {};

    Course.find()
        .then(course => {
            if (!course) {
                errors.noprofiles = 'No Course exist';
                return res.status(404).json(errors);
            }

            res.json(course);
        })
        .catch(err => res.status(404).json({
            course : 'course Dosent exits'
        }));
})


module.exports = router;
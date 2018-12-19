const express = require('express');
const router = express.Router();
//Load Input Validation
const validateCourseInput = require('../../validation/course');
const Course = require('../../models/Course');
const passport = require('passport');


//@route GET api/course/register ,max_marks subject_cate
//@desc Register route
//@access Public
router.post('/register', (req, res) => {
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
                    name: req.body.name,
                    coursecode: req.body.coursecode,
                    duration:req.body.duration,
                    specialization:req.body.specialization,
                    marking_criteria:req.body.marking_criteria,
                    academic_term:req.body.academic_term
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
	.populate('college_id')
    .then(agendas => {
        res.send(agendas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving agenda."
        });
    });

    // Course.find()
    //     .then(course => {
    //         if (!course) {
    //             errors.noprofiles = 'No Course exist';
    //             return res.status(404).json(errors);
    //         }

    //         res.json(course);
    //     })
    //     .catch(err => res.status(404).json({
    //         course : 'course Dosent exits'
    //     }));
})

// @route   DELETE api/university/:id
// @desc    Delete university
// @access  Private
router.delete(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.params.id)
        Course.findById(req.params.id).then(course => {
            // Delete
            course.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({
            course : 'course Doesnot exits'
        }))
        }    
  );


//@route GET api/university/universityupdate
//@desc Register route
//@access Public
router.post('/courseupdate', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateCourseInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }


     // Get fields
     const courseFields = {};
     if (req.body.name) courseFields.name = req.body.name;
     if (req.body.coursecode) courseFields.coursecode = req.body.coursecode;
     if (req.body.duration) courseFields.duration = req.body.duration;
     if (req.body.specialization) courseFields.specialization = req.body.specialization;
     if (req.body.marking_criteria) courseFields.marking_criteria = req.body.marking_criteria;
     if (req.body.academic_term) courseFields.academic_term = req.body.academic_term;
  
console.log(courseFields);

Course.findOne({
            _id: req.body._id
        })
        .then(course => {
            if (course) {
                Course.findOneAndUpdate(
                    { $set: courseFields }
                  )
                  .then(course => res.json(course))
                  .catch(err => res.status(404).json({
                    course : 'course Doesnot exits'
                }));
            } else {
            }
        })
})

//@route GET api/university/edit
//@desc Register route
//@access Public
router.get('/:id', (req, res) => {

    Course.findById(req.params.id)
    .then(university => {
        if(!university) {
            return res.status(404).send({
                message: "university not found "
            });            
        }
        res.send(university);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "university not found "
            });                
        }
        return res.status(500).send({
            message: "Error retrieving university "
        });
    });
})


module.exports = router;
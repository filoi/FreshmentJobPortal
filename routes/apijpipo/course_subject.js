const express = require('express');
const router = express.Router();
const passport = require('passport');
//Load Input Validation
const validateCollegeInput = require('../../validation/course_subject');
const Course_subject = require('../../models/Course_subject');

//@route GET api/college/register
//@desc Register route
//@access Public
router.post('/register', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateCollegeInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }
  
        const newCollege = new Course_subject({
            subject_id: req.body.subject_id,
            course_id: req.body.course_id,
        });


        newCollege.save()
            .then(college => res.json(college))
            .catch(err => console.log(err));

})


//@route  GET api/college/all
//@desc  Get all  university
//@access Public
router.get('/all', (req, res) => {

    const errors = {};

    Course_subject.find()
    .populate('course_id')
    .populate('subject_id')
    .then(agendas => {
        res.send(agendas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving agenda."
        });
    });
})


// @route   DELETE api/college/:id
// @desc    Delete college
// @access  Private
router.delete(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.params.id)
        Course_subject.findById(req.params.id).then(college => {
            // Delete
            college.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({
            university : 'College Doesnt exits'
        }))
        }    
  );



  //@route GET api/university/universityupdate
//@desc Register route
//@access Public
router.post('/update', (req, res) => {

    console.log(req.body)

     // Get fields
     const collegeFields = {};
     if (req.body.course_id) collegeFields.course_id = req.body.course_id;
     if (req.body.subject_id) collegeFields.subject_id = req.body.subject_id;
     

     Course_subject.findOneAndUpdate({
            _id: req.body._id
        })
        .then(college => {
            if (college) {
                Course_subject.findOneAndUpdate(
                    { $set: collegeFields }
                  )
                  .then(college => res.json(college))
                  .catch(err => res.status(404).json({
                    college : 'College Doesnot exits'
                }));
            } else {
                console.log('College Doesnoy Exits')
            }
        })
})

//@route GET api/university/edit
//@desc Register route
//@access Public
router.get('/:id', (req, res) => {

    const errors = {};

    Course_subject.find({"_id":req.params.id})
    .populate('course_id')
    .populate('subject_id')
    .then(agendas => {
        res.send(agendas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving agenda."
        });
    });
})

module.exports = router;
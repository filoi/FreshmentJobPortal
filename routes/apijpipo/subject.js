const express = require('express');
const router = express.Router();
const passport = require('passport');
//Load Input Validation
const validateSubjectInput = require('../../validation/subject');
const Subject = require('../../models/Subject');


//@route GET api/subject/subregister
//@desc Register route
//@access Public
router.post('/register', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateSubjectInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    Subject.findOne({
            code: req.body.code
        })
        .then(subject => {
            if (subject) {
                return res.status(400).json({
                    code: 'Code Already exits'
                });
            } else {
                const newSubject = new Subject({
                    name: req.body.name,
                    code: req.body.code,
                    max_marks:req.body.max_marks,
                    sub_category_id:req.body.sub_category_id,
                    status:req.body.status,
                    course_id:req.body.course_id,
                });


                newSubject.save()
                    .then(college => res.json(college))
                    .catch(err => console.log(err));


            }
        })
})


//@route  GET api/subject/all
//@desc  Get all  subject
//@access Public
router.get('/all', (req, res) => {

    const errors = {};

    Subject.find()
    .populate('sub_category_id')
        .then(subject => {
            if (!subject) {
                errors.noprofiles = 'No subject exist';
                return res.status(404).json(errors);
            }

            res.json(subject);
        })
        .catch(err => res.status(404).json({
            subject : 'subject Dosent exits'
        }));
})


// @route   DELETE api/subject/:id
// @desc    Delete subject
// @access  Private
router.delete(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.params.id)
        Subject.findById(req.params.id).then(subject => {
            // Delete
            subject.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({
            university : 'Subject Doesnt exits'
        }))
        }    
  );



  //@route GET api/subject/collegeupdate
//@desc Register route
//@access Public
router.post('/update', (req, res) => {

    console.log(req.body)

     // Get fields
     const subjectFields = {};
     if (req.body.name) subjectFields.name = req.body.name;
     if (req.body.code) subjectFields.code = req.body.code;
     if (req.body.max_marks) subjectFields.max_marks = req.body.max_marks;
     if (req.body.sub_category_id) subjectFields.sub_category_id = req.body.sub_category_id;
     if (req.body.status) subjectFields.status = req.body.status;
     if (req.body.course_id) subjectFields.course_id = req.body.course_id;

     console.log(req.body._id)
     console.log(subjectFields)

     Subject.findOneAndUpdate({
            _id: req.body._id
        })
        .then(subject => {
            if (subject) {
                Subject.findOneAndUpdate(
                    { $set: subjectFields }
                  )
                  .then(subject => res.json(subject))
                  .catch(err => res.status(404).json({
                    subject : 'Subject Doesnot exits'
                }));
            } else {
                console.log('Subject Doesnot Exits')
            }
        })
})

//@route GET api/university/edit
//@desc Register route
//@access Public
router.get('/:id', (req, res) => {

    Subject.findById(req.params.id)
    .populate('sub_category_id')
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
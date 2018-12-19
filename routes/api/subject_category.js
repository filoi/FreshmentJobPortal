const express = require('express');
const router = express.Router();
const passport = require('passport');
//Load Input Validation
const validateSubjectCategoryInput = require('../../validation/subject_category');
const SubjectCategory = require('../../models/SubjectCategory');



//@route GET api/subject_category/register
//@desc Register route
//@access Public
router.post('/subjectcategoryegister', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateSubjectCategoryInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }


    SubjectCategory.findOne({
            name: req.body.name
        })
        .then(scategory => {
            if (scategory) {
                return res.status(400).json({
                    email: 'Subject Category already exists'
                });
            } else {
                const newSubjectCategory = new SubjectCategory({
                    name: req.body.name,
                    code: req.body.code,
                    description:req.body.description
                });


                newSubjectCategory.save()
                    .then(subjectCategory => res.json(subjectCategory))
                    .catch(err => console.log(err));
            }
        })
})


//@route  GET api/subject_category/all
//@desc  Get all categories
//@access Public
router.get('/all', (req, res) => {

    const errors = {};

    SubjectCategory.find()
        .then(scategory => {
            if (!scategory) {
                errors.noprofiles = 'No Subject Categories exist';
                return res.status(404).json(errors);
            }

            res.json(scategory);
        })
        .catch(err => res.status(404).json({
            scategory : 'No Subject Categories exist'
        }));
})


// @route   DELETE api/subject_category/:id
// @desc    Delete category
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.params.id)
        SubjectCategory.findById(req.params.id).then(scategory => {
            // Delete
            scategory.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({
            scategory : 'Subject Category Doesnt exits'
        }))
        }    
  );



//@route GET api/subject_category/update
//@desc Register route
//@access Public
router.post('/subjectcategoryupdate', (req, res) => {

    console.log(req.body)

     // Get fields
     const scategoryFields = {};
     if (req.body.name) scategoryFields.name = req.body.name;
     if (req.body.code) scategoryFields.code = req.body.code;
     if (req.body.description) scategoryFields.description = req.body.description;


     console.log(req.body._id)
     console.log(scategoryFields)

    SubjectCategory.findOneAndUpdate({
            _id: req.body._id
        })
        .then(scategory => {
            if (scategory) {
                SubjectCategory.findOneAndUpdate(
                    { $set: scategoryFields }
                  )
                  .then(scategory => res.json(scategory))
                  .catch(err => res.status(404).json({
                    scategory : 'Subject Category does not exits'
                }));
            } else {
                console.log('Subject Category does not exits')
            }
        })
})

module.exports = router;
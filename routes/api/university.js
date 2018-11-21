const express = require('express');
const router = express.Router();
const passport = require('passport');
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
                    email: 'University Already exits'
                });
            } else {

                const newUniversity = new University({
                    name: req.body.university,
                    email: req.body.email,
                    mobileno:req.body.mobileno,
                    description:req.body.description,
                    affiliated:req.body.affiliated
                });

                console.log(newUniversity)

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




// @route   DELETE api/university/:id
// @desc    Delete university
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.params.id)
      University.findById(req.params.id).then(university => {
            // Delete
            university.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({
            university : 'University Doesnot exits'
        }))
        }    
  );


//@route GET api/university/universityupdate
//@desc Register route
//@access Public
router.post('/universityupdate', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateUniversityInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }


     // Get fields
     const universityFields = {};
     if (req.body.university) universityFields.name = req.body.university;
     if (req.body.email) universityFields.email = req.body.email;
     if (req.body.mobileno) universityFields.mobileno = req.body.mobileno;
     if (req.body.description) universityFields.description = req.body.description;
     if (req.body.affiliated) universityFields.affiliated = req.body.affiliated;
  
console.log(universityFields)

    University.findOne({
            _id: req.body._id
        })
        .then(university => {
            if (university) {
                University.findOneAndUpdate(
                    { $set: universityFields }
                  )
                  .then(university => res.json(university))
                  .catch(err => res.status(404).json({
                    university : 'University Doesnot exits'
                }));
            } else {
            }
        })
})








module.exports = router;
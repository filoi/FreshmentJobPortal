const express = require('express');
const router = express.Router();
const passport = require('passport');
//Load Input Validation
const validateCollegeInput = require('../../validation/college');
const College = require('../../models/College');

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
                    name: req.body.name,
                    email: req.body.email,
                    mobileno:req.body.mobileno,
                    code:req.body.code,
                    year:req.body.year,
                    //value:req.body.value,
                    university_id:req.body.university_id
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
	.populate('university_id')
    .then(agendas => {
        res.send(agendas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving agenda."
        });
    });

    // College.find()
    //     .then(college => {
    //         if (!college) {
    //             errors.noprofiles = 'No College exist';
    //             return res.status(404).json(errors);
    //         }

    //         res.json(college);
    //     })
    //     .catch(err => res.status(404).json({
    //         college : 'college Dosent exits'
    //     }));
})


// @route   DELETE api/college/:id
// @desc    Delete college
// @access  Private
router.delete(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.params.id)
      College.findById(req.params.id).then(college => {
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
     if (req.body.name) collegeFields.name = req.body.name;
     if (req.body.email) collegeFields.email = req.body.email;
     if (req.body.mobileno) collegeFields.mobileno = req.body.mobileno;
     if (req.body.year) collegeFields.year = req.body.year;
     if (req.body.code) collegeFields.code = req.body.code;
     if (req.body.universityaff) collegeFields.universityaff = req.body.universityaff;
     if (req.body.value) collegeFields.value = req.body.value;


     console.log(req.body._id)
     console.log(collegeFields)

    College.findOneAndUpdate({
            _id: req.body._id
        })
        .then(college => {
            if (college) {
                College.findOneAndUpdate(
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

    College.findById(req.params.id)
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
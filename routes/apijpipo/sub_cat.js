const express = require('express');
const router = express.Router();
const passport = require('passport');
//Load Input Validation
const validateSubInput = require('../../validation/sub_cat');
const Sub_Category = require('../../models/Sub_Category');

//@route GET api/sub_cat/register
//@desc Register route
//@access Public
router.post('/register', (req, res) => {
    console.log(req.body);
    const {
        errors,
        isValid
    } = validateSubInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    Sub_Category.findOne({
            code: req.body.code
        })
        .then(sub_cat => {
            console.log(sub_cat);
            
            if (sub_cat) {
                return res.status(400).json({
                    code: 'Code Already exits'
                });
            } else {
                const newSub_cat = new Sub_Category({
                    name: req.body.name,
                    code: req.body.code,
                    description:req.body.description,
                    status:req.body.status,
                    
                });


                newSub_cat.save()
                    .then(sub_cat => res.json(sub_cat))
                    .catch(err => console.log(err));


            }
        })
})


//@route  GET api/sub_cat/all
//@desc  Get all  sub_cat
//@access Public
router.get('/all', (req, res) => {

    const errors = {};

    Sub_Category.find()
        .then(sub_cat => {
            if (!sub_cat) {
                errors.noprofiles = 'No Subject category exist';
                return res.status(404).json(errors);
            }

            res.json(sub_cat);
        })
        .catch(err => res.status(404).json({
            sub_cat : 'Subject category Dosent exits'
        }));
})


// @route   DELETE api/sub_cat/:id
// @desc    Delete sub_cat
// @access  Private
router.delete(
    '/:id',
    //passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.params.id)
        Sub_Category.findById(req.params.id).then(sub_cat => {
            // Delete
            sub_cat.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({
            sub_cat : 'Subject category Doesnt exits'
        }))
        }    
  );



  //@route GET api/sub_cat/sub_catupdate
//@desc Register route 
//@access Public
router.post('/update', (req, res) => {

    console.log(req.body)

     // Get fields
     const SubCategoryFields = {};
     if (req.body.name) SubCategoryFields.name = req.body.name;
     if (req.body.code) SubCategoryFields.code = req.body.code;
     if (req.body.description) SubCategoryFields.description = req.body.description;
     if (req.body.status) SubCategoryFields.status = req.body.status;

     console.log(req.body._id)
     console.log(SubCategoryFields)

     Sub_Category.findOneAndUpdate({
            _id: req.body._id
        })
        .then(sub_cat => {
            if (sub_cat) {
                Sub_Category.findOneAndUpdate(
                    { $set: SubCategoryFields }
                  )
                  .then(sub_cat => res.json(sub_cat))
                  .catch(err => res.status(404).json({
                    sub_cat : 'Subject category Doesnot exits'
                }));
            } else {
                console.log('Subject category Doesnoy Exits')
            }
        })
})

//@route GET api/university/edit
//@desc Register route
//@access Public
router.get('/:id', (req, res) => {

    Sub_Category.findById(req.params.id)
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
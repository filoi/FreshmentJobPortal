const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const serverConfig = require('./config/keys');
const users = require('./routes/api/users');
const enrollment = require('./routes/api/enrollment');
const university = require('./routes/api/university');
const college = require('./routes/api/college');
const course = require('./routes/api/course');
const subject = require('./routes/api/subject');
const sub_cat = require('./routes/api/sub_cat');
const college_course = require('./routes/api/college_course');
const course_subject = require('./routes/api/course_subject');

const app = express();

//Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB Config
const db  = serverConfig.mongoURL;

//Connect to mongoDB
mongoose.connect(db)
        .then(()=> console.log('DB Connected'))
        .catch(err => console.log(err));


//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//use Routes
app.use('/api/users',users);
app.use('/api/enrollment',enrollment);
app.use('/api/university',university);
app.use('/api/college',college);
app.use('/api/course',course);
app.use('/api/subject',subject);
app.use('/api/sub_cat',sub_cat);
app.use('/api/college_course',college_course);
app.use('/api/course_subject',course_subject);



const port  = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server is running on port ${port}`));

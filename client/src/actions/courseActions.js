import axios from 'axios';

import { GET_ERRORS, GET_COURSES } from './types';

// Register User
export const createCourse = (userData, history) => dispatch => {
    console.log(userData)
  axios
    .post('/api/course/courseregister', userData)
    .then(res => history.push('/main/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};



//get All Course

export  const getCourses = () => dispatch => {

  axios
  .get('/api/course/all')
  .then(res =>
    dispatch({
      type:GET_COURSES,
      payload:res.data
    })
    )
    .catch(err =>
      dispatch({
        type:GET_COURSES,
        payload:null
      }));


}


import axios from 'axios';

import { GET_ERRORS,GET_COLLEGES,DELETE_COLLEGE } from './types';

// Register User
export const createCollege = (userData, history) => dispatch => {
    console.log(userData)
  axios
    .post('/api/college/collegeregister', userData)
    .then(res => history.push('/main/college'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};




//get All Universities

export  const getColleges = () => dispatch => {

  axios
  .get('/api/college/all')
  .then(res =>
    dispatch({
      type:GET_COLLEGES,
      payload:res.data
    })
    )
    .catch(err =>
      dispatch({
        type:GET_COLLEGES,
        payload:null
      }));


}



// Delete College
export const deleteCollege = (id) => dispatch => {
  axios
    .delete(`/api/college/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_COLLEGE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// update University
export const updateCollege= (college, history) => dispatch => {
  axios
    .post('/api/college/collegeupdate', college)
    .then(res => history.push('/main/college'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  };
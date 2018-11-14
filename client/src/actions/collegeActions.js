import axios from 'axios';

import { GET_ERRORS,GET_COLLEGES } from './types';

// Register User
export const createCollege = (userData, history) => dispatch => {
    console.log(userData)
  axios
    .post('/api/college/collegeregister', userData)
    .then(res => history.push('/dashboard'))
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

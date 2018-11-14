import axios from 'axios';

import { GET_ERRORS,GET_UNIVERSITIES } from './types';

// Register University
export const createUniversity = (userData, history) => dispatch => {
    console.log(userData)
  axios
    .post('/api/university/universityregister', userData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//get All Universities

export  const getUniversites = () => dispatch => {

  axios
  .get('/api/university/all')
  .then(res =>
    dispatch({
      type:GET_UNIVERSITIES,
      payload:res.data
    })
    )
    .catch(err =>
      dispatch({
        type:GET_UNIVERSITIES,
        payload:null
      }));


}





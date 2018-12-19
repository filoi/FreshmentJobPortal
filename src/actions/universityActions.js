import axios from 'axios';

import { GET_ERRORS,GET_UNIVERSITIES,DELETE_UNIVERSITY } from './types';

// Register University
export const createUniversity = (userData, history) => dispatch => {
  axios
    .post('/api/university/universityregister', userData)
    .then(res => history.push('/main/universities'))
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





// Delete Post
export const deleteUniversity = (id) => dispatch => {
  axios
    .delete(`/api/university/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_UNIVERSITY,
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
export const updateUniversity = (university, history) => dispatch => {
axios
  .post('/api/university/universityupdate', university)
  .then(res => history.push('/main/universities'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
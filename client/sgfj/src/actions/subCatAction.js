import axios from 'axios';

import { GET_ERRORS, GET_SUB_CATEGORY,DELETE_SUB_CATEGORY } from './types';

// Register Sub category
export const createSubCategory = (userData, history) => dispatch => {
  axios
    .post('/api/sub_cat/register', userData)
    .then(res => history.push('/main/subjectcategory'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get All Sub category

export  const getSubCategory = () => dispatch => {

  axios
  .get('/api/sub_cat/all')
  .then(res =>
    dispatch({
      type:GET_SUB_CATEGORY,
      payload:res.data
    })
    )
    .catch(err =>
      dispatch({
        type:GET_SUB_CATEGORY,
        payload:null
      }));
}

// Delete Post
export const deleteSubCategory = (id) => dispatch => {
  axios
    .delete(`/api/sub_cat/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_SUB_CATEGORY,
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
export const updateSubCategory = (subcategory, history) => dispatch => {
axios
  .post('/api/sub_cat/update', subcategory)
  .then(res => history.push('/main/subjectcategory'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
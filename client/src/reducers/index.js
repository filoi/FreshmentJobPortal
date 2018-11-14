import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import universityReducer from './universityReducer';
import collegeReducer from './collegeReducer';
import courseReducer from './courseReducer';


export default combineReducers({
  auth: authReducer,
  universities: universityReducer,
  colleges:collegeReducer,
  courses:courseReducer,
  errors: errorReducer
});
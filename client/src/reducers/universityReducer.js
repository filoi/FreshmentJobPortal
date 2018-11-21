import{
    GET_UNIVERSITIES, DELETE_UNIVERSITY
} from '../actions/types';


const initalState = {
    universities:null
};

export default function (state= initalState,action){
    switch(action.type){
        case GET_UNIVERSITIES:
        return {
            ...state,
            universities:action.payload
        }
        case DELETE_UNIVERSITY:
        return {
          ...state,
          universities: state.universities.filter(university => university._id !== action.payload)
        }
        default:
        return state;
    }
}
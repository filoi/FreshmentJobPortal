import{
    GET_COLLEGES,DELETE_COLLEGE
} from '../actions/types';



const initalState = {
    colleges:null
};

export default function (state= initalState,action){
    switch(action.type){
        case GET_COLLEGES:
        return {
            ...state,
            colleges:action.payload
        }
        case DELETE_COLLEGE:
        return {
          ...state,
          colleges: state.colleges.filter(college => college._id !== action.payload)
        }        
        default:
        return state;
    }
}
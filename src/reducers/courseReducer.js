import{
    GET_COURSES
} from '../actions/types';



const initalState = {
    courses:null
};

export default function (state= initalState,action){
    switch(action.type){
        case GET_COURSES:
        return {
            ...state,
            courses:action.payload
        }
        default:
        return state;
    }
}
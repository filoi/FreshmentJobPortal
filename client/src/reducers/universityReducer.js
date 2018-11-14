import{
    GET_UNIVERSITIES
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
        default:
        return state;
    }
}
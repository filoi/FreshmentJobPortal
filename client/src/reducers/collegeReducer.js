import{
    GET_COLLEGES
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
        default:
        return state;
    }
}
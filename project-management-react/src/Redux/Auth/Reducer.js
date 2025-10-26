import {
    GET_REQUEST, GET_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "@/Redux/Auth/ActionTypes.js";

const initialState={
    user:null,
    loading:false,
    error:null,
    jwt: localStorage.getItem("jwt") || null,
}
export const authReducer=(state=initialState, action)=>{
    switch (action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_REQUEST:
            return{...state,loading: true, error: null}
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state, loading: false, error: null, jwt: action.payload.jwt};
        case GET_SUCCESS:
            return {...state, loading: false, error: null, user: action.payload};
        case LOGOUT:
            localStorage.removeItem("jwt");
            return { user: null, loading: false, error: null, jwt: null };
        default:
            return state;
    }
}


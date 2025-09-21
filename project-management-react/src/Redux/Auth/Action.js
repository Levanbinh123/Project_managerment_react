import {
    GET_REQUEST, GET_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "@/Redux/Auth/ActionTypes.js";
import {API_BASE_URL} from "@/config/api.js";
import axios from "axios";
export const login=userData=>async (dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data}=await axios.post(`${API_BASE_URL}/auth/singup`,userData)
            localStorage.setItem("jwt", data.jwt)
        console.log("JWT from localStorage:", localStorage.getItem("jwt"));
            dispatch({type:LOGIN_SUCCESS, payload:data})
        console.log("user success", data);
    }catch (e) {
        console.log(e);
    }
}
export const register=userData=>async (dispatch)=> {
    dispatch({type: REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/register`, userData)
        console.log("LOGIN success", data);

        dispatch({type: REGISTER_SUCCESS, payload: data})
        if(data.jwt){
            localStorage.setItem("jwt", data.jwt)}

    } catch (e) {
        console.log("Register error:", e.response ? e.response.data : e.message);
    }
}
export const getUser=()=>async (dispatch)=>{
    dispatch({type:GET_REQUEST})
    try {
        const token = localStorage.getItem("jwt");
        if (!token) return;
        const {data}=await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('jwt')}`
            }
        });

            dispatch({type:GET_SUCCESS, payload:data})
        console.log("user success", data);
    }catch (e) {
        console.log(e);
    }
}
export const logout=()=>async (dispatch)=>{
    dispatch({type:LOGOUT})
    localStorage.clear();
}
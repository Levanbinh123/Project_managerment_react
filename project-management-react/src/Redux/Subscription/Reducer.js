import * as types from "./ACtionType.js"
const initialState={
    userSubcription:null,
    loading:false,
    error:null
};
const subscriptionReducer=(state=initialState, action)=>{
    switch (action.type){
        case types.GET_USER_SUPSCRIPTION_REQUEST:
        case types.UPGRADE_SUPSCRIPTION_REQUEST:
            return{
                ...state,
                loading: true,
                error:null
            };
        case types.GET_USER_SUPSCRIPTION_SUCCESS:
            return {
                ...state,
                userSubcription: action.payload,
                loading:false,
                error: null
            };
        case types.UPGRADE_SUPSCRIPTION_SUCCESS:
            return {
                ...state,
                userSubcription: action.payload,
                loading: false,
                error: null
            };
        case types.GET_USER_SUPSCRIPTION_FAI:
        case types.UPGRADE_SUPSCRIPTION_FAI:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
export  default subscriptionReducer;
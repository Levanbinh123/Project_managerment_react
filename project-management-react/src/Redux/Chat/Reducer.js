
import * as actionTypes from "./ActionType.js";
const initialState={
   messages:[],
    loading:false,
    error:null,
    chat:null,
}
export const chatReducer=(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.FETCH_MESSAGES_REQUEST:
        case actionTypes.SEND_MESSAGES_REQUEST:
        case actionTypes.FETCH_CHAT_MESSAGES_REQUEST:
            return{...state,loading: true, error: null}
        case actionTypes.FETCH_MESSAGES_SUSSES:
        case actionTypes.FETCH_CHAT_CHAT_MESSAGES_SUSSESS:
            return {...state, loading: false,
                messages: Array.isArray(action.payload) ? action.payload : [],
            };
        case actionTypes.SEND_MESSAGES_SUSSES:
            return {...state, loading: false,
                messages: [...state.messages, action.payload]};
        case actionTypes.FETCH_CHAT_BY_ID_PROJECT_SUSSESS:
            return {
                ...state,
                loading: false,
                chat: action.payload
            };
        case actionTypes.FETCH_MESSAGES_FAILUE:
        case actionTypes.FETCH_CHAT_CHAT_MESSAGES_FAILUE:
        case actionTypes.SEND_MESSAGES_FAILUE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
             return  state;
    }
}
export default chatReducer


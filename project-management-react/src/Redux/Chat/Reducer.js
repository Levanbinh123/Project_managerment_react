
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
        case actionTypes.FETCH_CHAT_MESSAGES_SUCCESS:
            // Xử lý payload có thể là object hoặc array
            { let messagesArray = [];

            if (Array.isArray(action.payload)) {
                messagesArray = action.payload;
            } else if (action.payload && typeof action.payload === 'object') {
                // Nếu là object có thuộc tính length (như log của bạn)
                if ('length' in action.payload) {
                    for (let i = 0; i < action.payload.length; i++) {
                        if (action.payload[i]) {
                            messagesArray.push(action.payload[i]);
                        }
                    }
                } else {
                    // Nếu là object thông thường, convert thành array
                    messagesArray = Object.values(action.payload);
                }
            }

            return {
                ...state,
                loading: false,
                messages: messagesArray
            }; }
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
        case actionTypes.FETCH_CHAT_MESSAGES_FAILURE:
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


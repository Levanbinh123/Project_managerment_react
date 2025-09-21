
import * as actionTypes from "./ActionType.js";
import api from "@/config/api.js";
export const sendMessages=(messageData)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.SEND_MESSAGES_REQUEST});
        try {
            const reponse=await api.post(
                "/api/message/send",
                messageData
            );
            dispatch({
                type:actionTypes.SEND_MESSAGES_SUSSES,
                payload:reponse.data,
            })
            console.log(reponse.data)
        }catch (e) {
            console.log(e);
            dispatch({
                type:actionTypes.SEND_MESSAGES_FAILUE,
                error:e.message
            });

        }
    };
};
export const fetchChatBayId=(projectId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_CHAT_BY_ID_PROJECT_REQUEST});
        try {
            const response=await api.get(
                `/api/message/chat/${projectId}`
            );
            console.log("fetch chat",response.data);
            dispatch({
                type:actionTypes.FETCH_CHAT_BY_ID_PROJECT_SUSSESS,
                payload:response.data
            });


        }catch (e) {
            console.log(e);
            dispatch({
                type:actionTypes.FETCH_CHAT_BY_ID_PROJECT_FAILUE,
                error:e.message,
            });
        }
    };
};
export const fetchChatMessages=(chatId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.FETCH_CHAT_MESSAGES_REQUEST});
        try {
            const response=await api.get(
                `/api/messages/chat/${chatId}`
            );
            console.log("fetch chat",response.data);
            dispatch({
                type:actionTypes.FETCH_CHAT_CHAT_MESSAGES_SUSSESS,
                chatId,
                payload:response.data,
            });


        }catch (e) {
            console.log(e);
            dispatch({
                type:actionTypes.FETCH_CHAT_CHAT_MESSAGES_FAILUE,
                error:e.message,
            });
        }
    };
};


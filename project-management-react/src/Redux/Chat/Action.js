import * as actionTypes from "./ActionType.js";
import api from "@/config/api.js";

export const sendMessages = (messageData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.SEND_MESSAGES_REQUEST });
        try {
            console.log("Sending message data:", messageData);
            const response = await api.post(
                "/api/message/send",
                messageData
            );
            dispatch({
                type: actionTypes.SEND_MESSAGES_SUSSES,
                payload: response.data,
            });
            console.log("Message sent", response.data);

            // Sau khi gửi tin nhắn thành công, fetch lại danh sách tin nhắn
            if (messageData.projectId) {
                // Cần có chatId để fetch messages, sẽ xử lý trong component
                dispatch(fetchChatByProjectId(messageData.projectId));
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: actionTypes.SEND_MESSAGES_FAILUE,
                error: e.message
            });
        }
    };
};

export const fetchChatByProjectId = (projectId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_CHAT_BY_ID_PROJECT_REQUEST });
        try {
            const response = await api.get(
                `/api/projects/${projectId}/chat`
            );
            console.log("Fetch chat response:", response.data);
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_ID_PROJECT_SUSSESS,
                payload: response.data
            });

            // Sau khi có chat info, tự động fetch messages
            if (response.data.id) {
                dispatch(fetchChatMessages(response.data.id));
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type: actionTypes.FETCH_CHAT_BY_ID_PROJECT_FAILUE,
                error: e.message,
            });
        }
    };
};

export const fetchChatMessages = (chatId) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_CHAT_MESSAGES_REQUEST });
        try {
            // Sử dụng endpoint đúng: /api/message/chat/{chatId}
            const response = await api.get(
                `/api/message/chat/${chatId}`
            );
            console.log("Fetch messages by chatId response:", response.data);
            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGES_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            console.log("Error fetching messages:", e);
            dispatch({
                type: actionTypes.FETCH_CHAT_MESSAGES_FAILURE,
                error: e.message,
            });
        }
    };
};
import * as actionTypes from "./ActionType.js";
import api from "@/config/api.js";
export const createComment=(commentData)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.CREATE_COMMENT_REQUEST});
        try {
            const response=await api.post(
                '/api/comments',commentData
            );
            console.log('comment created', response.data)
            dispatch({
                type:actionTypes.CREATE_COMMENT_SUCCESS,
                payload: response.data,
            })
        }catch (e) {
            console.log("error", e);
            dispatch({
                type:actionTypes.CREATE_COMMENT_FAILURE,
                error: e.message
            });

        }
    };
};
export const deleteComment=(commentId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.DELETE_COMMENT_REQUEST});
        try {
          const response= await api.delete(
                `/api/comments/${commentId}`
            );
            console.log(response)
            dispatch({type:actionTypes.DELETE_COMMENT_SUCCESS,
                payload: commentId });
            return response;
        }catch (e) {
            console.log("error", e);
            dispatch({
                type:actionTypes.DELETE_COMMENT_FAILURE,
                payload: e.message
            });

        }
    };
};
export const fetchComments=(issueId)=>{
    return async (dispatch)=>{
        dispatch({
            type:actionTypes.FETCH_COMMENT_REQUEST
        });
        try {
            const response=await api.get(
                `/api/comments/${issueId}`
            );

            dispatch({
                type:actionTypes.FETCH_COMMENT_SUCCESS,
                payload:response.data,
            })
            console.log("fetchs comment",response.data)
        }catch (e) {
            console.log("error",e)
dispatch({
    type:actionTypes.FETCH_COMMENT_FAILURE,
    payload: e.message
});
        }
    };
};
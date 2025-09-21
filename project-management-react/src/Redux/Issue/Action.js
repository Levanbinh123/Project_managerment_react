import * as actionTypes from "./ActionType.js";
import api from "@/config/api.js";
export const createIssues=(data)=>{
    return async (dispatch)=>{
        dispatch({
            type:actionTypes.CREATE_ISSUE_REQUEST
        });
        try {
            const response=await api.post(`/api/issues`,data);
            console.log("fetch issues", response.data);
            dispatch({
                type: actionTypes.CREATE_ISSUE_SUCCESS,
                issue:response.data
            });
            console.log("issue created", response.data);
        }catch (e){
            console.log("error",e);
            dispatch({
                type:actionTypes.CREATE_ISSUE_FAILURE,
                error:e.message,
            });

        }
    };
};


export const deleteIssueId=(id)=>{
    return async (dispatch)=>{
        dispatch({
            type:actionTypes.DELETE_ISSUE_REQUEST
        });
        try {
            const response=await api.delete(`/api/issues/`+id);
            console.log("deleted issues", response.data);
            dispatch({
                type: actionTypes.DELETE_ISSUE_SUCCESS,
                issueId: id,
            });
            console.log("issue created", response.data);
        }catch (e){
            console.log("error",e);
            dispatch({
                type:actionTypes.DELETE_ISSUE_FAILURE,
                error:e.message,
            });

        }
    };
};

export const fetchIssues=(id)=>{
    return async (dispatch)=>{
        dispatch({
            type:actionTypes.FETCH_ISSUES_REQUEST
        });
        try {
            const response=await api.get(`/api/issues/project/${id}`);
            console.log("fetch issues", response.data);
            dispatch({
                type:actionTypes.FETCH_ISSUES_SUCCESS,
                issues:response.data
            });
        }catch (e){
            console.log("error",e);
            dispatch({
                type:actionTypes.FETCH_ISSUES_FAILURE,
                error:e.message,
            });

        }
    };
};

export const fetchIssueById=(id)=>{
    return async (dispatch)=>{
        dispatch({
            type:actionTypes.FETCH_ISSUES_BY_ID_REQUEST
        });
        try {
            const response=await api.get(`/api/issues/${id}`);
            console.log("fetch issues by id", response.data);
            dispatch({
                type:actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
                issue:response.data
            });
            console.log("fetch issue detail",response.data)
        }catch (e){
            console.log("error",e);
            dispatch({
                type:actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
                error:e.message,
            });
        }
    };
};

export const updateIssue=({id, status})=>{
    return async (dispatch)=>{
        dispatch({
            type:actionTypes.UPDATE_ISSUE_STATUS_REQUEST
        });
        try {
            await api.put(`/api/issues/${id}/status/${status}`);
            const response = await api.get(`/api/issues/${id}`);
            console.log("fetch issues by id", response.data);
            dispatch({
                type:actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
                issue:response.data
            });
        }catch (e){
            console.log("error",e);
            dispatch({
                type:actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
                error:e.message,
            });
        }
    };
};

export const assignedUserToIssue=({isssueId, userId})=>{
    return async (dispatch)=>{
        dispatch({
            type:actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST
        });
        try {
            const response=await api.put(`/api/issues/${isssueId}/assignee/${userId}`);
            console.log("assignedUserToIssue", response.data);
            dispatch({
                type:actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
                issues:response.data
            });
        }catch (e){
            console.log("error",e);
            dispatch({
                type:actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
                error:e.message,
            });
        }
    };
};
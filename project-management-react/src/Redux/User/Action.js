

    import {
        DELETE_USER_FAILURE,
        DELETE_USER_SUCCESS,
        FETCH_USER_FAILURE,
        FETCH_USER_REQUEST,
        FETCH_USER_SUCCESS, UPDATE_USER_FAILURE,
        UPDATE_USER_SUCCESS
    } from "@/Redux/User/ActionTypes.js";
    import api from "@/config/api.js";
    export const fetchUsers = (  ) => async (dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });

        try {
            const token=localStorage.getItem("jwt");
            const res=await api.get("/api/users/admin",{
                headers:{Authorization:`Bearer ${token}`},
            });
            dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
        } catch (err) {
          dispatch({type:FETCH_USER_FAILURE, payload:err.response?.data||err.message});
        }
    };
    export const updateUser = (userId, userData) => async (dispatch) => {
        try {
            const token = localStorage.getItem("jwt");
            const res = await api.patch(`/api/users/admin/${userId}`, userData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
        } catch (err) {
            dispatch({ type: UPDATE_USER_FAILURE, payload: err.response?.data || err.message });
        }
    };
    // Admin: delete user
    export const deleteUser = (userId) => async (dispatch) => {
        try {
            const token = localStorage.getItem("jwt");
            await api.delete(`/api/users/admin/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
        } catch (err) {
            dispatch({ type: DELETE_USER_FAILURE, payload: err.response?.data || err.message });
        }
    };

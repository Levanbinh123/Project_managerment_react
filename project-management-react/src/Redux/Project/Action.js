import {
    ACCEPT_INVITATION_PROJECT_REQUEST,
    ACCEPT_INVITATION_SUCCESS,
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    FETCH_PROJECT_BY_ID_REQUEST,
    FETCH_PROJECT_BY_ID_SUCCESS,
    FETCH_PROJECT_REQUEST,
    FETCH_PROJECT_SUCCESS,
    INVITE_PROJECT_REQUEST,
    INVITE_PROJECT_SUCCESS,
    SEARCH_PROJECT_REQUEST,
    SEARCH_PROJECT_SUCCESS, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS
} from "@/Redux/Project/ActionTypes.js";
import api from "@/config/api.js";
export const fetchProjects = ({ category, tag }={}  ) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_REQUEST });
    try {

        const { data } = await api.get("/api/projects", { params: { category, tag } });
        console.log("all prj", data);
        dispatch({ type: FETCH_PROJECT_SUCCESS, projects: data });
    } catch (e) {
        console.log("error", e);
    }
};
export const fetchProjectById = (projectId) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/projects/${projectId}`);
        console.log("project by id", data);
        dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
    } catch (e) {
        console.log("error", e);
    }
};
export const searchProjects = ({ keyword }) => async (dispatch) => {
    dispatch({ type: SEARCH_PROJECT_REQUEST });
    try {
        const { data } = await api.get(`/api/projects/search?keyword=` + keyword);
        console.log("search prj", data);
        dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
    } catch (e) {
        console.log("error", e);
    }
};
export const createProjects = ( projectData ) => async (dispatch) => {
    dispatch({ type: CREATE_PROJECT_REQUEST });
    try {
        const { data } = await api.post("/api/projects", projectData);

        console.log("create project response:", data);
        dispatch({ type: CREATE_PROJECT_SUCCESS, projects: data });
    } catch (e) {
        console.log("create project error:", e.response?.data || e.message);
    }
};
export const updateProjects = ( projectId, projectData ) => async (dispatch) => {
    dispatch({ type: UPDATE_PROJECT_REQUEST });
    try {
        const { data } = await api.patch(`/api/projects/${projectId}`,projectData);

        console.log("update project response:", data);
        dispatch({ type: UPDATE_PROJECT_SUCCESS, projects: data });
    } catch (e) {
        console.log("UPDATE project error:", e.response?.data || e.message);
    }
};
export const deleteProjectsById = ({ projectId }) => async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
        await api.delete("/api/projects/" + projectId);
        console.log("delete project", projectId);
        dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
    } catch (e) {
        console.log("error", e);
    }
};

export const inviteToProjects = ({ email, projectId }) => async (dispatch) => {
    dispatch({ type: INVITE_PROJECT_REQUEST });
    try {
        const { data } = await api.post("/api/projects/invite", { email, projectId });
        console.log("invite project", data);
        dispatch({ type: INVITE_PROJECT_SUCCESS, payload: data });
    } catch (e) {
        console.log("error", e);
    }
};

export const accceptInvitation = ({ invitationToken, navigate }) => async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_PROJECT_REQUEST });
    try {
        const { data } = await api.get(
            "/api/projects/accept_invitation",
            { params: { token: invitationToken } }
        );
        navigate("/project/" + data.projectId);
        console.log("accepts", data);
        dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (e) {
        console.log("error", e);
    }
};

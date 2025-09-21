import {
    ACCEPT_INVITATION_PROJECT_REQUEST,
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_SUCCESS,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    FETCH_PROJECT_BY_ID_REQUEST,
    FETCH_PROJECT_BY_ID_SUCCESS,
    FETCH_PROJECT_REQUEST,
    FETCH_PROJECT_SUCCESS,
    INVITE_PROJECT_REQUEST,
    SEARCH_PROJECT_REQUEST,
    SEARCH_PROJECT_SUCCESS
} from "@/Redux/Project/ActionTypes.js";
const initialState = {
    projects: [],          // danh sách project
    loading: false,
    error: null,
    projectDetails: null,  // chi tiết project
    searchProjects: []     // kết quả search
};
export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECT_REQUEST:
        case DELETE_PROJECT_REQUEST:
        case FETCH_PROJECT_BY_ID_REQUEST:
        case ACCEPT_INVITATION_PROJECT_REQUEST:
        case INVITE_PROJECT_REQUEST:
        case SEARCH_PROJECT_REQUEST:
        case CREATE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: action.projects, // từ action creator
                error: null
            };
        case SEARCH_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                searchProjects: action.projects,
                error: null
            };
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: [...state.projects, action.projects], // thêm project mới
                error: null
            };
        case FETCH_PROJECT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                projectDetails: action.project,
                error: null
            };
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: state.projects.filter(
                    (project) => project.id !== action.projectId // xoá đúng
                ),
                error: null
            };
        default:
            return state;
    }
};
export default projectReducer
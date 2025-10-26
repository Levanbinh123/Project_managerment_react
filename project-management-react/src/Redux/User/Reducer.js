import {
    DELETE_USER_FAILURE,
    DELETE_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_SUCCESS
} from "@/Redux/User/ActionTypes.js";

const initialState = {
    profile: null,
    users: [],
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return { ...state, loading: true, error: null }; // THÊM loading: true

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map((u) =>
                    u.id === action.payload.id ? action.payload : u
                ),
                loading: false,
                error: null,
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter((u) => u.id !== action.payload),
                loading: false,
                error: null,
            };

        case FETCH_USER_FAILURE:
        case UPDATE_USER_FAILURE:
        case DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default userReducer;
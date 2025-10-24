import * as actionTypes from "./ActionType.js";

const initialState = {
    comments: [],
    loading: false,
    error: null
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_COMMENT_REQUEST:
        case actionTypes.DELETE_COMMENT_REQUEST:
        case actionTypes.FETCH_COMMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case actionTypes.CREATE_COMMENT_SUCCESS:
            { console.log("🔄 CREATE_COMMENT_SUCCESS - action:", action);
            console.log("📥 Payload received:", action.payload);
            console.log("📝 Current comments before add:", state.comments.map(c => ({id: c.id, content: c.content})));
            const newComments = [...state.comments, action.payload];
            console.log("✅ Comments after creation:", newComments.map(c => ({id: c.id, content: c.content})));
            return {
                ...state,
                loading: false,
                comments: newComments
            }; }

        case actionTypes.DELETE_COMMENT_SUCCESS:
            { console.log("DELETE_COMMENT_SUCCESS - action:", action);
            console.log("Deleting comment with ID:", action.payload); // Kiểm tra payload
            console.log("Current comments before delete:", state.comments);

            const updatedComments = state.comments.filter(
                (comment) => String(comment.id) !== String(action.payload) // Sửa thành action.payload
            );

                console.log("Comments after delete:", updatedComments.map(c => ({id: c.id, content: c.content})));


            return {
                ...state,
                loading: false,
                comments: updatedComments
            }; }

        case actionTypes.FETCH_COMMENT_SUCCESS:
            console.log("🔄 FETCH_COMMENT_SUCCESS - payload:", action.payload);
            return {
                ...state,
                loading: false,
                comments: [...action.payload],
                error: null,
            };

        case actionTypes.CREATE_COMMENT_FAILURE:
        case actionTypes.DELETE_COMMENT_FAILURE:
        case actionTypes.FETCH_COMMENT_FAILURE:
            console.log("❌ Comment error:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default commentReducer;
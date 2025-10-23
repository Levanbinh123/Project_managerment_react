import * as actionTypes from "./ActionType.js";
const initialState={
    comments:[],
    loading:false,
    error:null
};
const commentReducer=(state=initialState, action)=>{
    switch (action.type){
        case actionTypes.CREATE_COMMENT_REQUEST:
        case actionTypes.DELETE_COMMENT_REQUEST:
        case actionTypes.FETCH_COMMENT_REQUEST:
            return{
                ...state,
                loading: true,
                error:null
            };
        case actionTypes.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.payload]
            };
        case actionTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: state.comments.filter(
                    (comment) => String(comment.id) !== String(action.commentId)
                )
            };
        case actionTypes.FETCH_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...action.payload],
                error: null,
            };
        default:
            return state;
    }
}
export default commentReducer
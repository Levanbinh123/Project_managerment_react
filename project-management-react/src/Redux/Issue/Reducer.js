import * as actionTypes from "./ActionType.js";
const initialState={
    loading:false,
    issues:[],
    issueDetails:null,
    error:null
}
const issueReducer = (state = initialState, action) => {
    switch (action.type) {
        // ===== Fetch issues =====
        case actionTypes.FETCH_ISSUES_REQUEST:
        case actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST:
        case actionTypes.DELETE_ISSUE_REQUEST:
        case actionTypes.FETCH_ISSUES_BY_ID_REQUEST:
            return { ...state, loading:true, error: null };

        case actionTypes.CREATE_ISSUE_SUCCESS:
            return {
                ...state,
                loading: false,
                issues: [...state.issues, action.issue],
            };
        case actionTypes.FETCH_ISSUES_SUCCESS:
            return {
                ...state,
                loading: false,
                issues: action.issues
            }
        case actionTypes.FETCH_ISSUES_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                issueDetails: action.issue,
            };
        case actionTypes.UPDATE_ISSUE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                issues: state.issues.map((issue) =>
                    issue.id === action.issue.id ? action.issue : issue
                ),
                issueDetails:
                    state.issueDetails?.id === action.issue.id
                        ? action.issue
                        : state.issueDetails,
            };
        case actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                issues: state.issues.map((issue)=>
                    issue.id===action.issue.id? action.issue:issue
                ),
            };
        case actionTypes.DELETE_ISSUE_SUCCESS:
            return {
                ...state,
                loading: false,
                issues: state.issues.filter((issue)=>issue.id!==action.issueId),
            };
        case actionTypes.FETCH_ISSUES_FAILURE:
        case actionTypes.CREATE_ISSUE_FAILURE:
        case actionTypes.UPDATE_ISSUE_STATUS_FAILURE:
        case actionTypes.DELETE_ISSUE_FAILURE:
        case actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;

    }
};

export default issueReducer;
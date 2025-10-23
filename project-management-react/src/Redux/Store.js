import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import {authReducer} from "@/Redux/Auth/Reducer.js";
import {projectReducer} from "@/Redux/Project/Reducer.js";
import chatReducer from "@/Redux/Chat/Reducer.js";
import commentReducer from "@/Redux/Comment/Reducer.js";
import issueReducer from "@/Redux/Issue/Reducer.js";
import subscriptionReducer from "@/Redux/Subscription/Reducer.js";
import userReducer from "@/Redux/User/Reducer.js";

// tạo rootReducer (ví dụ rỗng, sau này thêm reducer vào)
const rootReducer
    = combineReducers({
    auth:authReducer,
    project:projectReducer,
    chat: chatReducer,
    comment:commentReducer,
    issue:issueReducer,
    subscription: subscriptionReducer,
    user:userReducer
});

// tạo store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

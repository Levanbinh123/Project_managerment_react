import * as types from "./ACtionType.js"
export const getUserSubscription=(jwt)=>{
    return async (dispatch)=>{
        dispatch({
            type:types.GET_USER_SUPSCRIPTION_REQUEST
        });
        try{
            const response=await api.get("/api/subscriptions/user",{
                headers:{
                    "Authorization":`Bearer${jwt}`
                }
            });
            dispatch({
                type:types.GET_USER_SUPSCRIPTION_SUCCESS,
                payload:response.data

            });
            console.log("user", response.data);
        }catch (e) {
            console.log("error", e);
            dispatch({
                type:types.GET_USER_SUPSCRIPTION_FAI,
                payload:e.messages
            });
        }
    };
};

export const upgradeSubscription=({planType}){
    return async (dispatch)=>{
        dispatch({
            type:types.UPGRADE_SUPSCRIPTION_REQUEST
        });
        try{
            const response=await api.put("/api/subscriptions/upgrade",null,{
                params:{
                    planType: planType
                }
            });
            dispatch({
                type:types.UPGRADE_SUPSCRIPTION_SUCCESS,
                payload:response.data

            });
            console.log("upgrade", response.data);
        }catch (e) {
            console.log("error", e);
            dispatch({
                type:types.UPGRADE_SUPSCRIPTION_FAI,
                payload:e.messages
            });
        }
    };
};


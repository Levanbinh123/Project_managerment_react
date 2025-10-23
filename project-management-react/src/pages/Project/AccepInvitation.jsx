import React from 'react';
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {accceptInvitation} from "@/Redux/Project/Action.js";
import {useLocation, useNavigate} from "react-router-dom";
const AccepInvitation=()=>{

    const  dispatch= useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const handleAcceptInvitation=()=>{
        const urlParams= new URLSearchParams(location.search);
        const token=urlParams.get('token');
            dispatch(accceptInvitation({invitationToken:token, navigate}))
    }
    return(
        <div className='h-[85vh] flex flex-col justify-center items-center'>
        <h1 className='py-5 font-semibold text-xl'>
            You are invited to join the project
        </h1>
        <Button onClick={handleAcceptInvitation}>Accept Invitation</Button>
        </div>
    )
}
export default AccepInvitation;
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {store} from "@/Redux/Store.js";
import {assignedUserToIssue} from "@/Redux/Issue/Action.js";
import {useParams} from "react-router-dom";

const UserList = ({issuDetails}) => {
    const {project}=useSelector(store=>store)
    const {userId}=useParams();
    const dispatch=useDispatch();
    const handleAssignIssueToUser=()=>{
        dispatch(assignedUserToIssue({issueId : issuDetails.id, userId}));
    }
  return (
    <>
    <div className='space-y-2'>
        <div className='border rounded-md'>
            <p className='py-2 px-3'> {issuDetails?.assigned?.fullName || "Unassigne"} </p>

        </div>
        {project.projectDetails?.team?.map((item)=> <div key={item}
                                                         onClick={()=>handleAssignIssueToUser(item.id)}
                                                         className='py-2 group hover:bg-slate-800
        cursor-pointer flex items-center space-x-4 rounded-md px-4'>
            <Avatar>
                <AvatarFallback>
                    {item.fullName[0]}
                </AvatarFallback>
            </Avatar>
            <div className='space-y-1'>
                <p className='text-sm leading-none'>@{item.fullName}</p>
                <p className='text-sm text-muted-foreground'>@{item.fullName.toLowerCase()}</p>
            </div>
        </div>)}
    </div>
    </>
  )
}

export default UserList
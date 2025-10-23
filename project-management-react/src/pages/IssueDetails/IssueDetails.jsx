import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CreateCommentForm from './CreateCommentForm';
import CommentCard from './CommentCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {useDispatch, useSelector} from "react-redux";
import {fetchIssueById, updateIssue} from "@/Redux/Issue/Action.js";
import {fetchComments} from "@/Redux/Comment/Action.js";


const IssueDetails = () => {
    const {  issueId } = useParams();
    const dispatch=useDispatch();
    const { issue} = useSelector(store => store);
    const { comment } = useSelector(store => store);

    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssue({ status, id:issueId}))
        console.log("Updated status:", status);
    };
    useEffect(()=>{
        if(issueId)
        dispatch(fetchComments(issueId))
        dispatch(fetchIssueById(issueId))

    },[dispatch, issueId ])
    const { issueDetails } = issue;
  return (
    <div className='px-20 py-8 text-gray-700'>
        <div className='flex justify-between border p-10 rounded-lg'>
            <ScrollArea className="h-[80vh] w-[60%]">
                <div>
                    <h1 className='text-lg font-semibold text-gray-700'>{issueDetails?.name}</h1>
                    <div className='py-5'>
                        <h2 className='font-semibold text-gray-700'>Title</h2>
                        <p className='text-gray-700 text-sm mt-3'>{issueDetails?.title}</p>
                    </div>
                    <div className='py-5'>
                        <h2 className='font-semibold text-gray-700'>Description</h2>
                        <p className='text-gray-700 text-sm mt-3'>{issueDetails?.description}</p>
                    </div>
                    <div className='mt-5'>
                        <h1 className='pb-3'>Activity</h1>
                        <Tabs defaultValue='comments' className='w-[400px]'>
                            <TabsList className="mb-5">
                                <TabsTrigger value="all">
                                    All
                                </TabsTrigger>
                                <TabsTrigger value="comments">
                                    Comments
                                </TabsTrigger>
                                <TabsTrigger value="history">
                                    History
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="all">
                                all make changes to your account here
                            </TabsContent>
                            <TabsContent value="comments">
                                <CreateCommentForm issueId={issueId}/>
                                <div className='mt-8 space-y-6'>
                                    {
                                        comment.comments.map((item) =>
                                        <CommentCard key={item.id} item={item} issueId={issueId} />)
                                    }
                                </div>
                            </TabsContent>
                            <TabsContent value="history">
                                History change your password here
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </ScrollArea>
            <div className='w-full lg:w-[30%] space-y-2'>
                <Select  onValueChange={handleUpdateIssueStatus}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="To Do" />
                    </SelectTrigger>
                    <SelectContent  className="bg-white text-gray-900 border-gray-200">
                        <SelectItem value="pending">To Do</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                </Select>
                <div className='border rounded-lg'>
                    <p className='border-b py-3 px-5'>Details</p>
                    <div className='p-5'>
                        <div className='space-y-7'>
                            <div className='flex gap-10 items-center'>
                                <p className='w-[7rem]'>Assignee</p>
                                <div className='flex items-center gap-3'>
                                    {issue.issueDetails?.assignee?.fullName ? (
                                        <Avatar className="h-8 w-8 text-xs">
                                            <AvatarFallback>
                                                {issue.issueDetails?.assignee?.fullName[0]}
                                            </AvatarFallback>
                                        </Avatar>,
                                        <p>{issue.issueDetails?.assignee?.fullName} </p>

                                    ):(
                                        <div className="flex items-center gap-2">
                                        <p>Unassigned</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex gap-10 items-center'>
                                <p className='w-[7rem]'>Labels</p>
                                <p>None</p>
                            </div>
                            <div className='flex gap-10 items-center'>
                                <p className='w-[7rem]'>Status</p>
                                <Badge>
                                    {issue.issueDetails?.status}
                                </Badge>
                            </div>
                            <div className='flex gap-10 items-center'>
                                <p className='w-[7rem]'>Realease</p>
                                <p>{issue.issueDetails?.dueDate}</p>
                            </div>
                            <div className='flex gap-10 items-center'>
                                <p className='w-[7rem]'>Reporter</p>
                                <div className='flex items-center gap-3'>
                                    <Avatar className="h-8 w-8 text-xs">
                                        <AvatarFallback>
                                            R
                                        </AvatarFallback>
                                    </Avatar>
                                    <p>Raam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default IssueDetails
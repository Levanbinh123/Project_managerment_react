import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CreateCommentForm from './CreateCommentForm';
import CommentCard from './CommentCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssue } from "@/Redux/Issue/Action.js";
import { fetchComments } from "@/Redux/Comment/Action.js";

const IssueDetails = () => {
    const { issueId } = useParams();
    const dispatch = useDispatch();
    const { issue } = useSelector(store => store);
    const { comment } = useSelector(store => store);

    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssue({ status, id: issueId }))
        console.log("Updated status:", status);
    };

    useEffect(() => {
        if (issueId) {
            dispatch(fetchComments(issueId))
            dispatch(fetchIssueById(issueId))
        }
    }, [dispatch, issueId])

    const { issueDetails } = issue;

    return (
        <div className='px-4 md:px-20 py-8 text-gray-700'>
            <div className='flex flex-col lg:flex-row gap-8 border p-6 md:p-10 rounded-lg'>
                {/* Left Content */}
                <div className='flex-1'>
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
                            <h1 className='pb-3 font-semibold'>Activity</h1>
                            <Tabs defaultValue='comments' className='w-full'>
                                <TabsList className="mb-5">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="comments">Comments</TabsTrigger>
                                    <TabsTrigger value="history">History</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all">
                                    <div className="text-sm text-gray-600">
                                        All activity will be shown here
                                    </div>
                                </TabsContent>

                                <TabsContent value="comments">
                                    <CreateCommentForm issueId={issueId} />
                                    <div className='mt-8 space-y-6'>
                                        {comment.comments.map((item) => (
                                            <CommentCard key={item.id} item={item} issueId={issueId} />
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="history">
                                    <div className="text-sm text-gray-600">
                                        History changes will be shown here
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className='w-full lg:w-[30%] space-y-4'>
                    <Select onValueChange={handleUpdateIssueStatus} defaultValue={issueDetails?.status}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="To Do" />
                        </SelectTrigger>
                        <SelectContent className="bg-white text-gray-900 border-gray-200">
                            <SelectItem value="pending">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className='border rounded-lg'>
                        <p className='border-b py-3 px-5 font-medium'>Details</p>
                        <div className='p-5'>
                            <div className='space-y-6'>
                                {/* Assignee */}
                                <div className='flex gap-4 items-center'>
                                    <p className='w-20 text-sm font-medium'>Assignee</p>
                                    <div className='flex items-center gap-3'>
                                        {issueDetails?.assignee?.fullName ? (
                                            <>
                                                <Avatar className="h-8 w-8 text-xs">
                                                    <AvatarFallback>
                                                        {issueDetails.assignee.fullName[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <p className="text-sm">{issueDetails.assignee.fullName}</p>
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm text-gray-500">Unassigned</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Labels */}
                                <div className='flex gap-4 items-center'>
                                    <p className='w-20 text-sm font-medium'>Labels</p>
                                    <p className="text-sm text-gray-600">None</p>
                                </div>

                                {/* Status */}
                                <div className='flex gap-4 items-center'>
                                    <p className='w-20 text-sm font-medium'>Status</p>
                                    <Badge variant="secondary" className="capitalize">
                                        {issueDetails?.status?.replace('_', ' ') || 'pending'}
                                    </Badge>
                                </div>

                                {/* Release/Due Date */}
                                <div className='flex gap-4 items-center'>
                                    <p className='w-20 text-sm font-medium'>Due Date</p>
                                    <p className="text-sm">
                                        {issueDetails?.dueDate || 'No due date'}
                                    </p>
                                </div>

                                {/* Reporter */}
                                <div className='flex gap-4 items-center'>
                                    <p className='w-20 text-sm font-medium'>Reporter</p>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className="h-8 w-8 text-xs">
                                            <AvatarFallback>
                                                {issueDetails?.reporter?.fullName?.[0] || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <p className="text-sm">
                                            {issueDetails?.reporter?.fullName || 'Unassigned'}
                                        </p>
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
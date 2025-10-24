import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { deleteComment } from "@/Redux/Comment/Action.js";

const CommentCard = ({ item }) => {
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }

        setIsDeleting(true);
        try {
            // Dispatch và đợi completion
            await dispatch(deleteComment(item.id));
            // Reducer sẽ cập nhật state, component sẽ re-render tự động
        } catch (error) {
            console.error("Failed to delete comment:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className='flex justify-between items-start p-4 hover:bg-gray-50 rounded-lg transition-colors'>
            <div className='flex items-start gap-4 flex-1'>
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                        {item?.user?.fullName?.[0] || 'U'}
                    </AvatarFallback>
                </Avatar>
                <div className='space-y-2 flex-1'>
                    <p className='font-medium text-gray-900'>{item?.user?.fullName || 'Unknown User'}</p>
                    <p className='text-gray-700 text-sm leading-relaxed'>{item?.content}</p>
                    {item.createdAt && (
                        <p className='text-xs text-gray-500'>
                            {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </div>

            <Button
                onClick={handleDelete}
                className="rounded-full"
                variant="ghost"
                size="icon"
                disabled={isDeleting}
            >
                <TrashIcon className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default CommentCard;
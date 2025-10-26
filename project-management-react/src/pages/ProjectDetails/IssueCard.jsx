import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotsVerticalIcon, PersonIcon } from '@radix-ui/react-icons'
import React from 'react'
import UserList from './UserList'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { deleteIssueId } from "@/Redux/Issue/Action.js";
const IssueCard = ({ item, projectId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleIssueDelete = () => {
        dispatch(deleteIssueId(item.id));
    };
    return (
        <div>
            <Card className="rounded-md py-1 pb-2">
                <CardHeader className="py-0 pb-1">
                    <div className='flex justify-between items-center'>
                        <CardTitle
                            className="cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => navigate(`/project/${projectId}/issue/${item.id}`)}
                        >
                            {item.title}
                        </CardTitle>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="rounded-full"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <DotsVerticalIcon/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-white border border-gray-200 shadow-md rounded-md"
                                align="end"
                            >
                                <DropdownMenuItem
                                    onClick={handleIssueDelete}
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>

                <CardContent className="py-0">
                    <div className='flex items-center justify-between'>
                        <p className="text-sm text-gray-600">FBF - {item.id}</p>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-gray-900 text-white text-xs">
                                            <PersonIcon className="h-4 w-4"/>
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-white border border-gray-200 shadow-md rounded-md w-64"
                                align="end"
                            >
                                <UserList issueDetails={item}/>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default IssueCard
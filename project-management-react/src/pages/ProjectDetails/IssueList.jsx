import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useEffect } from 'react'
import IssueCard from './IssueCard'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import CreateIssueForm from './CreateIssueForm'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchIssues } from "@/Redux/Issue/Action.js";

const IssueList = ({ title, status }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { issue } = useSelector(store => store)

    useEffect(() => {
        dispatch(fetchIssues(id))
    }, [dispatch, id])

    return (
        <div>
            {/* Dialog phải nằm ở cấp cao hơn */}
            <Dialog>
                <Card className="w-full md:w-[300px] lg:w-[310px]">
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className="space-y-2">
                            {issue.issues.filter((issue => issue?.status == status))
                                .map((item) => (
                                    <IssueCard projectId={id} item={item} key={item.id} />
                                ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        {/* DialogTrigger vẫn nằm trong Card */}
                        <DialogTrigger asChild>
                            <Button
                                className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                                <PlusIcon className="mr-2" />
                                Create Issue
                            </Button>
                        </DialogTrigger>
                    </CardFooter>
                </Card>

                {/* DialogContent nằm ngoài Card */}
                <DialogContent className="bg-white border border-gray-200 max-w-md mx-auto">
                    <DialogHeader>
                        <DialogTitle className="text-center">Create New Issue</DialogTitle>
                    </DialogHeader>
                    <CreateIssueForm status={status} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default IssueList
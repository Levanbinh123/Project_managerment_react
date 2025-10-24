import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProjectsById, fetchProjects } from "@/Redux/Project/Action.js";
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import UpdateProjectForm from "@/pages/Project/UpdateProjectForm.jsx";

const ProjectCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        if (item.id) {
            dispatch(deleteProjectsById({ projectId: item.id }));
            alert("Deleted");
        }
    };
    const handleUpdate = () => {
        setOpen(true); // mở form update
    };

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);
    return (
        <Card className="p-5 w-full lg:max-w-3xl shadow-md rounded-2xl">
            <div className="space-y-5">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-5">
                            <h1
                                onClick={() => navigate(`/project/${item.id}`)}
                                className="cursor-pointer font-bold text-lg hover:underline"
                            >
                                {item.name}
                            </h1>
                            <DotFilledIcon />
                            <p className="text-sm text-gray-400">{item?.category}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-full" variant="ghost" size="icon">
                                    <DotsVerticalIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    {item.tags?.map((tag, index) => (
                        <Badge key={index} variant="outline">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Update Project</DialogTitle>
                    </DialogHeader>
                    <UpdateProjectForm project={item} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ProjectCard;

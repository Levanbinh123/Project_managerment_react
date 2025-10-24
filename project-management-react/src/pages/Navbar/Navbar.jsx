import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, } from "@/components/ui/dialog";
import CreateProjectForm from "../Project/CreateProjectForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/Redux/Auth/Action.js";

const Navbar = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { project, auth } = useSelector(store => store);
const handleLogout=()=>{
dispatch(logout());
}
    const handleChatNavigate = () => {
        // Nếu có projects, điều hướng đến project đầu tiên
        if (project.projects && project.projects.length > 0) {
            const firstProjectId = project.projects[0].id;
            navigate(`/chat/${firstProjectId}`);
        } else {
            // Nếu không có project, điều hướng đến chat page tổng
            navigate("/chat");
        }
    };
const userRole=auth?.user?.role;
  return (
    <div className="bg-gradient-to-r bg-blue-500 text-white shadow-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <p onClick={()=>navigate("/")} className="cursor-pointer">Project Management</p>
            <Dialog>
                <DialogTrigger >
                    <Button variant="ghost">New Project</Button>
                </DialogTrigger>
                    <Button onClick={handleChatNavigate} variant="ghost">Chat</Button>

                <DialogContent className="bg-white text-gray-900 border-gray-200" >
                    <DialogHeader>Create New Project Form</DialogHeader>
                    <CreateProjectForm />
                </DialogContent>
            </Dialog>
            {/*<Button onClick={()=>navigate("/upgrade_plan")} variant="ghost">Upgrade</Button>*/}
            {userRole==="ROLE_ADMIN"&&(
                <Button onClick={()=>navigate("/admin")} variant="ghost">User Management</Button>
            )}
        </div>

        <div className="flex gap-3 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-500">
                        <PersonIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={handleLogout} className="bg-white text-gray-900 border-gray-200" >
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <p>Code with Me</p>
        </div>
    </div>
  );
};

export default Navbar;

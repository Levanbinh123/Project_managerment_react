import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "@/Redux/User/Action.js";

const AdminPage = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    const handleDelete = (userItem) => {
        if (userItem.role === "ROLE_ADMIN") {
            alert(" Không thể xoá tài khoản Admin!");
            return;
        }
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(userItem.id));
        }
    };
    const handleToggleRole = (userItem) => {
        const newRole = userItem.role === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN";
        dispatch(updateUser(userItem.id, { role: newRole }));
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-gray-500">Loading users...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                <h2 className="text-lg font-semibold text-red-800 mb-2">
                    Error loading users
                </h2>
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                    variant="destructive"
                    onClick={() => dispatch(fetchUsers())}
                >
                    Retry
                </Button>
            </div>
        );
    }
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
                 User Management
            </h2>
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-200 bg-gray-50">
                        <TableRow>
                            <TableCell className="text-center font-semibold">ID</TableCell>
                            <TableCell className="text-center font-semibold">Full Name</TableCell>
                            <TableCell className="text-center font-semibold">Email</TableCell>
                            {/*<TableCell className="text-center font-semibold">Project Size</TableCell>*/}
                            <TableCell className="text-center font-semibold">Role</TableCell>
                            <TableCell className="text-center font-semibold">Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100">
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((userItem) => (
                                <TableRow key={userItem.id} className="hover:bg-gray-50">
                                    <TableCell className="text-center">{userItem.id}</TableCell>
                                    <TableCell className="text-center">{userItem.fullName || "N/A"}</TableCell>
                                    <TableCell className="text-center">{userItem.email || "N/A"}</TableCell>
                                    {/*<TableCell className="text-center">{userItem.projectSize ?? 0}</TableCell>*/}
                                    <TableCell className="text-center">
                                        <Badge
                                            className={`px-3 py-1 ${
                                                userItem.role === "ROLE_ADMIN"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-blue-500 text-white"
                                            }`}
                                        >
                                            {userItem.role.replace("ROLE_", "")}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-3">

                                            <Button
                                                className="bg-blue-600"
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleToggleRole(userItem)}
                                            >
                                                Toggle Role
                                            </Button>
                                            <Button
                                                className="bg-red-600"
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(userItem)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    No users found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdminPage;

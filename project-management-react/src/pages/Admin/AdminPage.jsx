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
    const { user } = useSelector((store) => store);
    useEffect(() => {
        console.log("Fetching users...");
        dispatch(fetchUsers());
    }, [dispatch]);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    };
    const handleToggleRole = (userItem) => {
        const newRole = userItem.role === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN";
        dispatch(updateUser(userItem.id, { role: newRole }));
    };

    if (user.loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-gray-500">Loading users...</div>
            </div>
        );
    }
    if (user.error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-lg font-semibold text-red-800">Error loading users</h2>
                <p className="text-red-600">{user.error}</p>
                <button
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                    onClick={() => dispatch(fetchUsers())}
                >
                    Retry
                </button>
            </div>
        );
    }

    const users = user.users || [];

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                User Management ({users.length} users)
            </h2>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                ID
                            </TableCell>
                            <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Full Name
                            </TableCell>
                            <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Email
                            </TableCell>
                            <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Project Size
                            </TableCell>
                            <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Role
                            </TableCell>
                            <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {users.length > 0 ? (
                            users?.map((userItem) => (
                                <TableRow key={userItem.id}>
                                    <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {userItem.id}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {userItem.fullName || "N/A"}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {userItem.email || "N/A"}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {userItem.projectSize ?? 0}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-start">
                                        <Badge
                                            className={
                                                userItem.role === "ROLE_ADMIN"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-blue-500 text-white"
                                            }
                                        >
                                            {userItem.role ? userItem.role.replace("ROLE_", "") : "N/A"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleToggleRole(userItem)}
                                        >
                                            Toggle Role
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(userItem.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="px-5 py-8 text-center text-gray-500">
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
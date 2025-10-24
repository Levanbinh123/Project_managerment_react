import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChatByProjectId } from "@/Redux/Chat/Action.js";
import { connectSocket, sendSocketMessage } from "@/lib/socket.js";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth, chat, project } = useSelector((store) => store);

    // 🔹 Load tin nhắn cũ
    useEffect(() => {
        if (id) {
            dispatch(fetchChatByProjectId(id));
        }
    }, [id, dispatch]);

    // 🔹 Khi Redux chat thay đổi => đồng bộ
    useEffect(() => {
        if (chat.messages) {
            const array = Array.isArray(chat.messages)
                ? chat.messages
                : Object.values(chat.messages);
            setMessages(array);
        }
    }, [chat.messages]);

    // 🔹 Kết nối WebSocket & nhận tin realtime
    useEffect(() => {
        if (id) {
            connectSocket(id, (newMessage) => {
                // ✅ chỉ thêm nếu message thuộc project này
                if (newMessage.chat?.project?.id === parseInt(id)) {
                    setMessages((prev) => {
                        const alreadyExists = prev.some((m) => m.id === newMessage.id);
                        return alreadyExists ? prev : [...prev, newMessage];
                    });
                }
            });
        }
    }, [id]);

    //  Gửi tin nhắn qua socket (KHÔNG thêm local nữa)
    const handleSendMessage = () => {
        if (!message.trim()) return;

        const tempMessage = {
            id: Date.now(), // fake ID tạm
            sender: { id: auth.user?.id, fullName: auth.user?.fullName },
            chat: { project: { id: Number(id) } },
            content: message,
            createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, tempMessage]);
        sendSocketMessage(id, tempMessage);

        setMessage("");
    };
    const handleSelectProject = (projectId) => {
        navigate(`/chat/${projectId}`);
        dispatch(fetchChatByProjectId(projectId));
    };

    return (
        <div className="container mx-auto shadow-lg rounded-lg bg-white">
            <div className="px-5 py-5 flex justify-between items-center border-b">
                <div className="font-semibold text-2xl">Project Chat</div>
                <div className="text-sm text-gray-500">
                    {!chat.loading && `Messages: ${messages.length}`}
                </div>
            </div>

            <div className="flex flex-row h-[90vh]">
                {/* Sidebar - danh sách dự án */}
                <div className="w-1/3 border-r p-3 overflow-y-auto">
                    <h2 className="font-semibold text-lg mb-3">Danh sách dự án</h2>
                    <div className="space-y-5 min-h-[74vh]">
                        {project.projects?.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleSelectProject(item.id)}
                                className={`cursor-pointer p-3 rounded-md hover:bg-gray-100 ${
                                    parseInt(id) === item.id ? "bg-gray-200" : ""
                                }`}
                            >
                                <h2 className="font-semibold">{item.name}</h2>
                                <p className="text-gray-400 text-sm">Bấm để xem đoạn chat</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Khu vực chat chính */}
                <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b">
                        <h3 className="font-semibold text-lg">
                            {chat.chat?.name || `Chat for Project ${id}`}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {chat.chat?.project?.name || "Loading project..."}
                        </p>
                    </div>

                    {/* Hiển thị tin nhắn */}
                    <ScrollArea className="flex-1 p-5">
                        <div className="flex flex-col gap-4">
                            {chat.loading ? (
                                <div className="text-center text-gray-400 py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                    <p className="mt-2">Loading messages...</p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center text-gray-400 py-8">
                                    <p>Chưa có tin nhắn nào trong cuộc trò chuyện này.</p>
                                    <p className="text-sm mt-1">Hãy là người đầu tiên gửi tin nhắn!</p>
                                </div>
                            ) : (
                                messages.map((item) => {
                                    const isOwnMessage = item.sender?.id === auth.user?.id;
                                    return (
                                        <div
                                            key={item.id}
                                            className={`flex items-end gap-3 ${
                                                isOwnMessage ? "justify-end" : "justify-start"
                                            }`}
                                        >
                                            {!isOwnMessage && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="text-xs">
                                                        {item.sender?.fullName?.charAt(0).toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}

                                            <div
                                                className={`rounded-2xl px-4 py-2 max-w-md shadow ${
                                                    isOwnMessage
                                                        ? "bg-blue-500 text-white rounded-br-none"
                                                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                                                }`}
                                            >
                                                <p className="font-semibold text-sm mb-1">
                                                    {isOwnMessage
                                                        ? "Bạn"
                                                        : item.sender?.fullName || "Unknown User"}
                                                </p>
                                                <p>{item.content}</p>
                                                <p className="text-xs opacity-70 mt-1 text-right">
                                                    {new Date(item.createdAt).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>

                                            {isOwnMessage && (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="text-xs">
                                                        {auth.user?.fullName?.charAt(0).toUpperCase() || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </ScrollArea>

                    {/* Ô nhập tin nhắn */}
                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Nhập tin nhắn..."
                                className="flex-1"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!message.trim() || !chat.chat?.id}
                                className="whitespace-nowrap"
                            >
                                <PaperPlaneIcon className="w-4 h-4 mr-2" />
                                Gửi
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Thông tin dự án */}
                <div className="w-1/4 border-l p-5">
                    <h2 className="font-semibold text-lg mb-3">Thông tin dự án</h2>
                    {chat.chat?.project ? (
                        <>
                            <p className="text-gray-800 font-medium mb-2">
                                {chat.chat.project.name}
                            </p>
                            <p className="text-gray-600 mb-4">
                                {chat.chat.project.description}
                            </p>
                            <div className="text-sm">
                                <p>
                                    <span className="font-semibold">Category:</span>{" "}
                                    {chat.chat.project.category}
                                </p>
                                <p className="font-semibold mt-3">Tags:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {chat.chat.project.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-200 px-2 py-1 rounded text-xs"
                                        >
                      {tag}
                    </span>
                                    ))}
                                </div>
                                <p className="font-semibold mt-3">Owner:</p>
                                <p className="text-gray-600">
                                    {chat.chat.project.owner?.fullName}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-400">Đang tải thông tin dự án...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;

import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export const connectSocket = (projectId, onMessageReceived) => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log(" Connected to WebSocket");
        // subscribe topic
        stompClient.subscribe(`/topic/project/${projectId}`, (message) => {
            const body = JSON.parse(message.body);
            onMessageReceived(body);
        });
    });
};

export const sendSocketMessage = (projectId, msg) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(`/app/chat/${projectId}`, {}, JSON.stringify(msg));
    } else {
        console.error(" Socket not connected yet!");
    }
};

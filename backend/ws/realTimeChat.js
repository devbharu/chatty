
import WebSocket from "ws";
import Message from "../models/message.js";
import Chat from "../models/chat.js";


const chatRooms = new Map();

export function realTimeChat(wss) {
    wss.on("connection", (socket) => {
        console.log("New client connected");

        let currentChatId = null;

        socket.on("message", async (rawMessage) => {
            try {
                const data = JSON.parse(rawMessage.toString());


                if (data.type === "join") {
                    const { chatId } = data.payload;
                    currentChatId = chatId;

                    if (!chatRooms.has(chatId)) {
                        chatRooms.set(chatId, new Set());
                    }

                    chatRooms.get(chatId).add(socket);
                    console.log(`User joined chat ${chatId}`);
                }


                if (data.type === "chat") {
                    const { chatId, senderId, content } = data.payload;


                    const newMessage = await Message.create({
                        chat: chatId,
                        sender: senderId,
                        content,
                    });


                    await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage._id });


                    const room = chatRooms.get(chatId);
                    if (room) {
                        room.forEach((clientSocket) => {
                            if (clientSocket.readyState === WebSocket.OPEN) {
                                clientSocket.send(JSON.stringify(newMessage));
                            }
                        });
                    }
                }
            } catch (err) {
                console.error("WebSocket message error:", err);
            }
        });

        socket.on("close", () => {
            if (currentChatId) {
                const room = chatRooms.get(currentChatId);
                if (room) {
                    room.delete(socket);
                    if (room.size === 0) chatRooms.delete(currentChatId);
                }
                console.log(`User left chat ${currentChatId}`);
            }
        });
    });
}

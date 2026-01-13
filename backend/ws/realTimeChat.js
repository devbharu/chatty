import WebSocket from "ws";
import Message from "../models/message.js";
import Chat from "../models/chat.js";


const chatRooms = new Map();

export function realTimeChat(wss, sessionMiddleware) {

    wss.on("connection", (socket, req) => {


        sessionMiddleware(req, {}, () => {

            if (!req.session || !req.session.userId) {
                socket.close();
                return;
            }

            socket.userId = req.session.userId;
            console.log("WS connected user:", socket.userId);
        });

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

                    console.log(`User ${socket.userId} joined chat ${chatId}`);
                }


                if (data.type === "chat") {
                    const { chatId, content, mediaUrl } = data.payload;
                    const senderId = socket.userId;

                    const newMessage = await Message.create({
                        chat: chatId,
                        sender: senderId,
                        content,
                        mediaUrl,
                    });

                    // Populate sender info before broadcasting
                    await newMessage.populate('sender', 'name  avatar');

                    await Chat.findByIdAndUpdate(chatId, {
                        lastMessage: newMessage._id,
                    });

                    const room = chatRooms.get(chatId);

                    if (room) {
                        const payload = JSON.stringify({
                            type: "chat",
                            payload: newMessage,
                        });

                        room.forEach((clientSocket) => {
                            if (clientSocket.readyState === WebSocket.OPEN) {
                                clientSocket.send(payload);
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
                    if (room.size === 0) {
                        chatRooms.delete(currentChatId);
                    }
                }

                console.log(`User ${socket.userId} left chat ${currentChatId}`);
            }
        });
    });
}

import express from "express";
import Message from "../models/message.js";
import userResponse from "../utils/api.response.js";
import { isAuthenticated } from "../middleware/auth.js";
import Chat from "../models/chat.js";

const router = express.Router();


router.get("/messages/:chatId", isAuthenticated, async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const userId = req.session.userId;

        if (!chatId) {
            return userResponse(res, 400, false, "Chat ID is required");
        }


        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name email avatar")
            .sort({ createdAt: 1 });


        const chat = await Chat.findById(chatId);
        if (!chat.users.includes(userId)) return userResponse(res, 403, false, "Forbidden");

        userResponse(res, 200, true, "Messages fetched", messages);
    } catch (err) {
        next(err);
    }
});

export default router;

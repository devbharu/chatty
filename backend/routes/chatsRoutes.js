import express from "express";
import Chat from "../models/chat.js";
import userResponse from "../utils/api.response.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/chats/single", isAuthenticated, async (req, res, next) => {
    try {
        const { otherUserId } = req.body;
        const userId = req.session.userId;

        if (!otherUserId) {
            return userResponse(res, 400, false, "Other user ID is required");
        }

        let chat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [userId, otherUserId] },
        })
            .populate("users", "name email avatar")
            .populate("lastMessage");

        if (!chat) {
            // IMPORTANT: Current user first, then other user
            chat = await Chat.create({
                isGroupChat: false,
                users: [userId, otherUserId], // Current user is ALWAYS first
            });
            await chat.populate("users", "name email avatar");
        }

        // Ensure the response always has current user first
        if (chat.users[0]._id.toString() !== userId.toString()) {
            chat.users.reverse(); // Swap if needed
        }

        userResponse(res, 200, true, "Single chat fetched/created", chat);
    } catch (err) {
        next(err);
    }
});

router.post("/chats/group", isAuthenticated, async (req, res, next) => {
    try {
        const { name, users } = req.body;
        const creatorId = req.session.userId;

        if (!name || !users || users.length < 1) {
            return userResponse(res, 400, false, "Group name and users required");
        }

        const groupUsers = [creatorId, ...users];

        const groupChat = await Chat.create({
            isGroupChat: true,
            chatName: name,
            users: groupUsers,
        });

        await groupChat.populate("users", "name email avatar");

        userResponse(res, 200, true, "Group chat created", groupChat);
    } catch (err) {
        next(err);
    }
});


router.get("/chats", isAuthenticated, async (req, res, next) => {
    try {
        const userId = req.session.userId;

        const chats = await Chat.find({
            users: userId,
        })
            .populate("users", "name email avatar")
            .populate({
                path: "lastMessage",
                populate: { path: "sender", select: "name email avatar" },
            })
            .sort({ updatedAt: -1 });

        userResponse(res, 200, true, "Chats fetched", chats);
    } catch (err) {
        next(err);
    }
});

export default router;

import express from "express";

import Chat from "../models/chat.js";
import userResponse from "../utils/api.response.js";

const router = express.Router();

router.post("/chats/single", async (req, res) => {
    try {
        const { usr1, usr2 } = req.body

        const chatData = await Chat.create({
            isGroupChat: false,
            users: [usr1, usr2]
        })


        userResponse(res, 200, true, "chat of the users", chatData)
    } catch (err) {
        next(err);
    }


})

router.post("/chats/group", async (req, res) => {
    try {
        const { name, users } = req.body

        const groupChat = await Chat.create({
            isGroupChat: true,
            chatName: name,
            users: users
        })

        userResponse(res, 200, true, "chat of the users", groupChat)

    } catch (err) {
        next(err);
    }


})


router.get("/chats/:userId", async (req, res) => {

    try {
        const id = req.params.userId

        const data = await Chat.find({
            users: id
        })
            .populate("users")
            .populate("lastMessage");
        if (!data) {
            res.json({
                message: "no data"
            })
        }

        userResponse(res, 200, true, "chat of the users", data)
    } catch (err) {

        next(err);
    }

})


export default router;

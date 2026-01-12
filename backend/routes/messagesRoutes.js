import express from "express";
import Message from "../models/message.js"
import userResponse from "../utils/api.response.js";

const router = express.Router();


router.get("/messages/:id", async (req, res) => {

    try {
        const { id } = req.params.id
        const data = await Message.find({
            chat: id
        }).populate("sender", "name")
            .sort({ createdAt: 1 });

        userResponse(res, 200, true, " user messages ", data)

    } catch (err) {
        next(err);
    }


})



export default router;

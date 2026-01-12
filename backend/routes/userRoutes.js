import express from "express";
import { User } from "../models/user.js";
import userResponse from "../utils/api.response.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.post("/createUser", async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;

        const data = await User.create({ name, email, avatar });

        userResponse(res, 201, true, "User created", data);
    } catch (err) {
        next(err);
    }
});


router.get("/getUsers", isAuthenticated, async (req, res, next) => {
    try {
        const users = await User.find()
            .select("name avatar");

        userResponse(res, 200, true, "All users", users);
    } catch (err) {
        next(err);
    }
});


router.get("/me", isAuthenticated, async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId)
            .select("name email avatar");

        if (!user) {
            return userResponse(res, 404, false, "User not found");
        }

        userResponse(res, 200, true, "Current user", user);
    } catch (err) {
        next(err);
    }
});


router.post(
    "/me/avatar",
    isAuthenticated,
    upload.single("file"),
    async (req, res, next) => {
        try {
            const file = req.file;

            if (!file) {
                return userResponse(res, 400, false, "No file uploaded");
            }

            cloudinary.uploader.upload_stream(
                { folder: "user_avatars" },
                async (error, result) => {
                    if (error) {
                        return userResponse(res, 500, false, "Cloudinary upload failed");
                    }

                    const user = await User.findByIdAndUpdate(
                        req.session.userId,
                        { avatar: result.secure_url },
                        { new: true }
                    ).select("name email avatar");

                    userResponse(res, 200, true, "Avatar updated", user);
                }
            ).end(file.buffer);

        } catch (err) {
            next(err);
        }
    }
);

export default router;

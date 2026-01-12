import express from "express";
import { User } from "../models/user.js";
import userResponse from "../utils/api.response.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";


const router = express.Router();

router.post("/createUser", async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        const data = await User.create({
            name: name,
            email: email,
            avatar: avatar
        })

        userResponse(res, 200, true, "user  created", data)
    } catch (err) {
        next(err)
    }


});


router.get("/getUsers", async (req, res) => {
    try {


        const data = await User.find({

        }).select("name email")

        userResponse(res, 200, true, "all  users", data)
    } catch (err) {

        next(err);
    }


});



router.post(
    "/users/:userId/avatar",
    upload.single("file"),
    async (req, res) => {
        try {
            const { userId } = req.params;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            // Upload to Cloudinary
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "user_avatars",
                    },
                    async (error, result) => {
                        if (error) {
                            return res.status(500).json({ message: "Cloudinary upload failed" });
                        }

                        // Save avatar URL in User document
                        const user = await User.findByIdAndUpdate(
                            userId,
                            { avatar: result.secure_url },
                            { new: true }
                        );

                        if (!user) {
                            return res.status(404).json({ message: "User not found" });
                        }

                        res.status(200).json({
                            message: "Avatar updated successfully",
                            avatar: user.avatar,
                            user,
                        });
                    }
                )
                .end(file.buffer);

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Upload failed" });
        }
    }
);




export default router;

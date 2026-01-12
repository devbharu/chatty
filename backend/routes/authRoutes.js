import bcrypt from "bcryptjs";
import express from "express";
import { User } from "../models/user.js";

const router = express.Router();


router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });


        req.session.userId = user._id;

        res.status(201).json({
            message: "Signup successful",
            userId: user._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Signup failed" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.userId = user._id;

        res.json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed" });
    }
});


router.post("/logout", (req, res) => {
    try {
        // Destroy session
        req.session.destroy((err) => {
            if (err) {
                console.error("Logout error:", err);
                return res.status(500).json({ message: "Logout failed" });
            }

            // Clear cookie
            res.clearCookie("chat_session");
            res.json({ message: "Logout successful" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Logout failed" });
    }
});

export default router;

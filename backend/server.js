import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

import connectDb from "./utils/connectDB.js";
import errorMiddleware from "./utils/error.middleware.js";
import userRoutes from "./routes/userRoutes.js";
import chatsRoutes from "./routes/chatsRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import userResponse from "./utils/api.response.js";
import authRouter from "./routes/authRoutes.js"
import { realTimeChat } from "./ws/realtimechat.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });


connectDb();


app.use(express.json());

app.use(cors());
console.log(process.env.SESSION_SECRET)

const sessionMiddleware = session({
    name: "chat_session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "sessions",
    }),

    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
});

app.use(sessionMiddleware);


realTimeChat(wss, sessionMiddleware);


app.get("/test", (req, res, next) => {
    try {
        userResponse(res, 200, true, "API working", req.session.userId);
    } catch (e) {
        next(e);
    }
});

app.use("/api", authRouter);
app.use("/api", userRoutes);
app.use("/api", chatsRoutes);
app.use("/api", messagesRoutes);


app.use(errorMiddleware);


server.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});

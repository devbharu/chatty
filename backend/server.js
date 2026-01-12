import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./utils/error.middleware.js";
import userResponse from "./utils/api.response.js";
import connectDb from "./utils/connectDB.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import chatsRoutes from "./routes/chatsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { realTimeChat } from "./ws/realtimechat.js";


const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(cors());
connectDb();


realTimeChat(wss);


app.get("/test", (req, res, next) => {
    try {
        const user = req.body.user;
        userResponse(res, 200, true, "API working", user);
    } catch (e) {
        next(e);
    }
});

app.use("/api", userRoutes);
app.use("/api", chatsRoutes);
app.use("/api", messagesRoutes);
app.use("/api", userRoutes);


app.use(errorMiddleware);

server.listen(3000, () => console.log("Server running on port 3000"));

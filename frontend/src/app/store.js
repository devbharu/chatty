import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import chatsReducer from "../slices/chatSlice";
import messagesReducer from "../slices/messagesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        chats: chatsReducer,
        messages: messagesReducer,
    },
});

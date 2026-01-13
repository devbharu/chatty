import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Fetch messages for a specific chat
export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async (chatId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/messages/${chatId}`, {
                withCredentials: true
            });
            return { chatId, messages: res.data.data };
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: 'Failed to fetch messages' });
        }
    }
);

// Send a message (via HTTP, then WebSocket will broadcast it)
export const sendMessage = createAsyncThunk(
    "messages/sendMessage",
    async ({ chatId, content, mediaUrl }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/messages`,
                { chatId, content, mediaUrl },
                { withCredentials: true }
            );
            return { chatId, message: res.data.data };
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: 'Failed to send message' });
        }
    }
);

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        messagesByChat: {}, // { chatId: [messages] }
        loading: false,
        error: null,
    },
    reducers: {
        // Add a message received via WebSocket
        addMessageFromSocket: (state, action) => {
            const { chatId, message } = action.payload;
            if (!state.messagesByChat[chatId]) {
                state.messagesByChat[chatId] = [];
            }
            state.messagesByChat[chatId].push(message);
        },

        // Clear messages for a specific chat
        clearMessages: (state, action) => {
            const chatId = action.payload;
            delete state.messagesByChat[chatId];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch messages
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                const { chatId, messages } = action.payload;
                state.messagesByChat[chatId] = messages;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch messages';
            })

            // Send message (optimistic update will be handled by WebSocket)
            .addCase(sendMessage.pending, (state) => {
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.error = action.payload?.message || 'Failed to send message';
            });
    },
});

export const { addMessageFromSocket, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
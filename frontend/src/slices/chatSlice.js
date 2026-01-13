import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Fetch all chats for logged-in user
export const fetchChats = createAsyncThunk(
    "chats/fetchChats",
    async (_, { rejectWithValue, getState }) => {
        try {
            const res = await axios.get(`${API_URL}/chats`, { withCredentials: true });
            const currentUserId = getState().users.currentUser?._id;

            // Normalize all chats to have current user first in the users array
            const normalizedChats = res.data.data.map(chat => {
                if (!chat.isGroupChat && chat.users.length === 2) {
                    // If current user is not first, swap them
                    if (chat.users[0]._id !== currentUserId) {
                        chat.users = [chat.users[1], chat.users[0]];
                    }
                }
                return chat;
            });

            return normalizedChats;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createSingleChat = createAsyncThunk(
    "chats/createSingleChat",
    async (otherUserId, { rejectWithValue, getState }) => {
        try {
            const res = await axios.post(
                `${API_URL}/chats/single`,
                { otherUserId },
                { withCredentials: true }
            );

            const chat = res.data.data;
            const currentUserId = getState().users.currentUser?._id;

            // Ensure current user is first in the array
            if (!chat.isGroupChat && chat.users.length === 2) {
                if (chat.users[0]._id !== currentUserId) {
                    chat.users = [chat.users[1], chat.users[0]];
                }
            }

            return chat;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Create group chat
export const createGroupChat = createAsyncThunk(
    "chats/createGroupChat",
    async ({ name, users }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/chats/group`,
                { name, users },
                { withCredentials: true }
            );
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [],
        selectedChat: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Failed to fetch chats';
            })

            .addCase(createSingleChat.fulfilled, (state, action) => {
                const existing = state.chats.find(c => c._id === action.payload._id);
                if (!existing) {
                    state.chats.unshift(action.payload);
                }
                state.selectedChat = action.payload;
            })

            .addCase(createGroupChat.fulfilled, (state, action) => {
                state.chats.unshift(action.payload);
                state.selectedChat = action.payload;
            });
    },
});

export const { setSelectedChat } = chatsSlice.actions;
export default chatsSlice.reducer;
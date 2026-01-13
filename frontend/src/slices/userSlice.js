import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Fetch all users (for chat selection)
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/getUsers`, { withCredentials: true });
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Fetch current user
export const fetchMe = createAsyncThunk(
    "users/fetchMe",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState: {
        currentUser: null,
        allUsers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                // Filter out current user from the list
                state.allUsers = action.payload.filter(
                    user => user._id !== state.currentUser?._id
                );
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            .addCase(fetchMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                // Re-filter allUsers if they were already loaded
                if (state.allUsers.length > 0) {
                    state.allUsers = state.allUsers.filter(
                        user => user._id !== action.payload._id
                    );
                }
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default userSlice.reducer;
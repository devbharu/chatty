import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

// Check session by fetching current user
export const checkSession = createAsyncThunk(
    "auth/checkSession",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/me`, { withCredentials: true });
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Session invalid" });
        }
    }
);

// Async thunks
export const signup = createAsyncThunk(
    "auth/signup",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/signup`, { name, email, password }, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Signup failed" });
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Login failed" });
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Logout failed" });
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        user: null,
        loading: false,
        error: null,
        isLoggedIn: false,
        sessionChecked: false, // Track if we've checked the session
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Check Session
            .addCase(checkSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.userId = action.payload._id || action.payload.id;
                state.isLoggedIn = true;
                state.sessionChecked = true;
            })
            .addCase(checkSession.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.sessionChecked = true;
                state.user = null;
                state.userId = null;
            })

            // Signup
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload.userId;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Signup failed";
            })

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userId = action.payload.userId;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.userId = null;
                state.user = null;
                state.isLoggedIn = false;
            });
    },
});

export default authSlice.reducer;
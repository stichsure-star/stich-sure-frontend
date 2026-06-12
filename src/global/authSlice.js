import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 1. Fixed spelling here
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// 2. Fixed spelling here too
export const { setCredentials, setRole, logout } = authSlice.actions;
export default authSlice.reducer;

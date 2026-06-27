import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null,
  paymentData: null,
  resp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },

    setShipmentReceipt: (state, action) => {
      state.resp = action.payload;
    },
    clearShipmentReceipt: (state) => {
      state.resp = null; // or state.resp = {}; depending on your initial state setup
    },

    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

// 2. Fixed spelling here too
export const {
  setCredentials,
  setRole,
  updateUser,
  logout,
  setPaymentData,
  setShipmentReceipt,
  clearShipmentReceipt,
} = authSlice.actions;
export default authSlice.reducer;

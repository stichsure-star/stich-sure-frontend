import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null,
  // ✅ Instantly restore payment data from disk memory on reload or gateway redirect
  paymentData: localStorage.getItem("paymentData")
    ? JSON.parse(localStorage.getItem("paymentData"))
    : null,
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
      state.resp = null;
    },

    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },

    // ✅ Clean up both the Redux state and the browser memory after verification
    clearPaymentData: (state) => {
      state.paymentData = null;
      localStorage.removeItem("paymentData");
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.paymentData = null;
      localStorage.removeItem("paymentData");
    },
  },
});

export const {
  setCredentials,
  setRole,
  updateUser,
  logout,
  setPaymentData,
  clearPaymentData, // ✅ Added to your exports
  setShipmentReceipt,
  clearShipmentReceipt,
} = authSlice.actions;

export default authSlice.reducer;

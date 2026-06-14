import { ApiClient } from "./AxiosInstance";

export const authApi = {
  login: (role, data) => ApiClient.post(`/${role}/login`, data),

  verifyOtp: (role, data) => ApiClient.post(`/${role}/verify`, data),

  resendOtp: (role, data) => ApiClient.post(`/${role}/resend-otp`, data),

  forgotPassword: (role, data) =>
    ApiClient.post(`/${role}/forget-password`, data),

  resetPassword: (role, data) =>
    ApiClient.post(`/${role}/reset-password`, data),

  google: () => ApiClient.get("/auth/google"),
};

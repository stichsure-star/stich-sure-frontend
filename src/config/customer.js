import { resumeToPipeableStream } from "react-dom/server";
import { ApiClient } from "./AxiosInstance";

export const customerAuth = {
  register: (requestBody) => ApiClient.post("/customer/register", requestBody),
  login: (requestBody) => ApiClient.post("/customer/login", requestBody),
  verify: (requestBody) => ApiClient.post("/customer/verify", requestBody),
  forgetpassword: (requestBody) =>
    ApiClient.post("/customer/forget-password", requestBody),
  resendotp: (requestBody) =>
    ApiClient.post("/customer/resend-otp", requestBody),
  resetpassword: (requestBody) =>
    ApiClient.post("/customer/reset-password", requestBody),
  google: (requestBody) => ApiClient.post("/auth/google", requestBody),
  googlecallback: (requestBody) =>
    ApiClient.post("/auth/google/callback", requestBody),
};

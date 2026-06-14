import { resumeToPipeableStream } from "react-dom/server";
import { ApiClient } from "./AxiosInstance";

export const designerAuth = {
  signup: (requestBody) => ApiClient.post("/designer/create", requestBody),
  login: (requestBody) => ApiClient.post("/designer/login", requestBody),
  verify: (requestBody) => ApiClient.post("/designer/verify", requestBody),
  forgetpassword: (requestBody) =>
    ApiClient.post("/designer/forget-password", requestBody),
  resendotp: (requestBody) =>
    ApiClient.post("/designer/resend-otp", requestBody),
  resetpassword: (requestBody) =>
    ApiClient.post("/designer/reset-password", requestBody),
  google: (requestBody) => ApiClient.post("/auth/google", requestBody),
  googlecallback: (requestBody) =>
    ApiClient.post("/auth/google/callback", requestBody),
};

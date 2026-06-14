import { ApiClient } from "./AxiosInstance";

export const onboardingApi = {
  customerSignup: (data) => ApiClient.post("/customer/register", data),

  designerSignup: (data) => ApiClient.post("/designer/create", data),
};

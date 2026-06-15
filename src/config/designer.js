import { ApiClient } from "../config/AxiosInstance";

export const designerApi = {
  setUpProfile: (data) =>
    ApiClient.post("/designerProfile/onboarding", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  uploadDesign: (data) =>
    ApiClient.post("/designs/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

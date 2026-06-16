import { ApiClient } from "../config/AxiosInstance";

export const authApi = {
  updateprofile: (id, data) =>
    ApiClient.put(`/customer/update-profile/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  updatepassword: (data) => ApiClient.put(`/customer/update-password/`, data),

  design: (data) => ApiClient.get(`/designs/getAll`),
  designCategory: (data) => ApiClient.post(`/designs/getAll/category`),
  userDashboard: (data) => ApiClient.get(`/customer/dashboard-stats`),
};

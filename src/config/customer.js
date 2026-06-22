import { ApiClient } from "../config/AxiosInstance";

export const customerApi = {
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
  request: (designerId, data) => {
    if (data instanceof FormData) {
      return ApiClient.post(`/request/create/${designerId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    return ApiClient.post(`/request/create/${designerId}`, data);
  },
  saveDesigner: (id) => ApiClient.post(`/customer/saved-designers/${id}`),
  removeDesigner: (id) => ApiClient.delete(`/customer/saved-designers/${id}`),
  savedDesigner: (data) => ApiClient.get(`/customer/saved-designers`),
};

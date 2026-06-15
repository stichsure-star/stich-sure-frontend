import { ApiClient } from "../config/AxiosInstance";

export const authApi = {
  updateprofile: (id, data) =>
    ApiClient.put(`/customer/update-profile/${id}`, data),

  updatepassword: (data) => ApiClient.put(`/customer/update-password/`, data),

  
};

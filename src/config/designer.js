import { ApiClient } from "../config/AxiosInstance";

export const designerApi = {
  setUpProfile: (data) =>
    ApiClient.patch("/designerProfile/onboarding", data, {
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

  getProfile: (id) => ApiClient.get(`/designer/one/${id}`),
  dashBoard: (data) => ApiClient.get(`/designerProfile/dashboard-stats`),

  designsCreate: (data) => ApiClient.post("/designs/create", data),
  resetPassword: (data) => ApiClient.put(`/designer/update-password-setting`),
  updateWallet: (data) => ApiClient.put(`/designerWallet/update`, data),

  updateProfileSettings: (data) =>
    ApiClient.patch("/designerProfile/updateDesignerProfileSettings", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  collaborationrequest: (data) => ApiClient.post("/collaboration/create", data),
  acceptrecevied: (data) => ApiClient.get("/collaboration/received", data),
  acceptcollab: (id) => ApiClient.put(`/collaboration/accept/${id}`),
  rejectcollab: (id) => ApiClient.put(`/collaboration/reject/${id}`),
  collaborationstats: (data) => ApiClient.get("/collaboration/stats", data),
  mycollabs: (data) => ApiClient.get("/collaboration", data),
  getOne: (id) => ApiClient.get(`/designer/one/${id}`),
  allOrder: (data) => ApiClient.get(`/orders`, data),
  orderId: (id) => ApiClient.get(`orders/${id}`),
};

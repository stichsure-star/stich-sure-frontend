import { ApiClient } from "../config/AxiosInstance";

export const designerApi = {
  // Onboarding & Profile Setup
  setUpProfile: (data) =>
    ApiClient.patch("/designerProfile/onboarding", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getProfile: (id) => ApiClient.get(`/designer/one/${id}`),
  getOne: (id) => ApiClient.get(`/designer/one/${id}`),

  dashBoard: () => ApiClient.get(`/designerProfile/dashboard-stats`),

  updateProfileSettings: (data) =>
    ApiClient.patch("/designerProfile/updateDesignerProfileSettings", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  resetPassword: () => ApiClient.put(`/designer/update-password-setting`),

  // Designs Management
  uploadDesign: (data) =>
    ApiClient.post("/designs/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  designsCreate: (data) => ApiClient.post("/designs/create", data),

  // Wallet Management
  updateWallet: (data) => ApiClient.put(`/designerWallet/update`, data),

  // Collaboration Management
  collaborationrequest: (data) => ApiClient.post("/collaboration/create", data),
  acceptrecevied: (data) => ApiClient.get("/collaboration/received", data),
  acceptcollab: (id) => ApiClient.put(`/collaboration/accept/${id}`),
  rejectcollab: (id) => ApiClient.put(`/collaboration/reject/${id}`),
  collaborationstats: (data) => ApiClient.get("/collaboration/stats", data),
  mycollabs: (data) => ApiClient.get("/collaboration", data),

  // Order Management
  orderId: (id) => ApiClient.get(`/orders/${id}`),

  // Fetches lists filtered perfectly via lowercase string statuses
  allAders: (id, status) =>
    ApiClient.get(`/orders/designer/list/${id}`, {
      params: { status },
    }),

  // Shipment Validation & Processing
  shipPy: (data) => ApiClient.post("/shipment/validate-address", data),
  Valid: (data) => ApiClient.post("/shipment/shipment", data),
  delTe: (id) =>
    ApiClient.delete(
      `/deswalletData: ApiClient.get("/withdrawaligns/delete/${id}`,
    ),
  walletData: (data) => ApiClient.get("/withdrawal/balance", data),
  walletHistory: (data) => ApiClient.get("/withdrawal/history", data),
  allDesigns: (id) => ApiClient.get(`/designs/getDesignerDesigns/${id}`),
};

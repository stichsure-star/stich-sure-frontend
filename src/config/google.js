export const authed = {
  google: () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  },
};

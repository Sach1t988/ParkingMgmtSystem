export const useAuthStore = defineStore("auth", {
  state: () => {
    return {};
  },
  actions: {
    async login(payload: { phoneNumber: string; password: string }) {
      try {
        const { data } = await useHttp.$post<any>("/auth/login", payload);
        if (data.accessToken) {
          localStorage.setItem("authorization", data.accessToken);
        }
        if (data.user) {
          localStorage.setItem("user", data.user);
        }
        console.log("This is the login response", data);
      } catch (error) {
        console.error("Failed to login", error);
      }
    },
    async fetchCurrentUser(id: string) {
      try {
        const response = await useHttp.$get(`/users/${id}`);
        console.log("User response", response);
      } catch (error) {
        console.error("Failed to fetch current user", error);
      }
    },
  },
});

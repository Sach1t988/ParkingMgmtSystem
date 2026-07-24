import type { Role, RolesResponse } from "~/types/roles";

export const useRoles = () => {
  const config = useRuntimeConfig();

  const authHeaders = (): Record<string, string> => {
    const token = import.meta.client
      ? localStorage.getItem("token")
      : null;

    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  };

  const getRoles = async (): Promise<Role[]> => {
    try {
      const response = await $fetch<RolesResponse>("/roles", {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: authHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      return [];
    }
  };

  return {
    getRoles,
  };
};
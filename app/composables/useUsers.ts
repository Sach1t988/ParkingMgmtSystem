import type { User } from "~/types/user";

export const useUsers = () => {
  const config = useRuntimeConfig();

  const createUser = async (user: User) => {
    try {
      await $fetch("/users", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: user,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getUserByID = async (id: string) => {
    try {
      const apiBase = config.public.apiBase || "http://192.168.1.133:6767";
      const res = await $fetch<any>(`/users/${id}`, {
        baseURL: apiBase,
        method: "GET",
      });
      if (res && typeof res === "object" && "data" in res && res.data) {
        return res.data as User;
      }
      return res as User;
    } catch (error) {
      console.error(`Failed to fetch user by ID (${id}):`, error);
      return null;
    }
  };

  return {
    createUser,
    getUserByID,
  };
};

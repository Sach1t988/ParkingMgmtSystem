import type { User, UserResponse } from "~/types/user";
import type { CreateUserRequest } from "~/types/user";

export const useUsers = () => {
  const config = useRuntimeConfig();

  const authHeaders = (): Record<string, string> => {
    const token = import.meta.client ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

 
const createUser = async (user: CreateUserRequest) => {
    const { data, error } = await useFetch("/users", {
      baseURL: config.public.apiBase,
      method: "POST",
      headers: authHeaders(),
      body: user,
    });

    if (error.value) {
      console.error(error.value);
      return false;
    }

    return true;
  };

  const getUsers = async (
    isActive?: boolean,
    phoneNumber?: string
  ): Promise<User[]> => {
    try {
      const response = await $fetch<UserResponse>("/users", {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: authHeaders(),
        query: {
          ...(isActive !== undefined && { isActive }),
          ...(phoneNumber && { phoneNumber }),
        },
      })

      return response.data
    } catch (error) {
      console.error("Failed to fetch users:", error)
      return []
    }
  };

  //   const getUserByID = async (id: string) => {
  //     try {
  //       const data = await $fetch(`/users/${id}`, {
  //         baseURL: config.public.apiBase,
  //         method: "GET",
  //         headers: authHeaders(),
  //       });

  //       console.log("Response:", data);

  //       return data;
  //     } catch (err) {
  //       console.error("Fetch Error:", err);
  //       return null;
  //     }
  //   };

  const getUserByID = async (id: string) => {
    try {
      const response = await $fetch<{
        success: boolean;
        data: User;
      }>(`/users/${id}`, {
        baseURL: config.public.apiBase,
        method: "GET",
        headers: authHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  };

  return {
    createUser,
    getUserByID,
    getUsers
  };
};

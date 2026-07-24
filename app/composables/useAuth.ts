// import type { LoginResponse } from "~/types/auth";

// export const useAuth = () => {
//   const login = async (phoneNumber: string, password: string) => {
//     try {
//       const { data, error } = await useFetch<LoginResponse>(
//         "http://192.168.1.133:6767/auth/login",
//         {
//           method: "POST",
//           body: {
//             phoneNumber,
//             password,
//           },
//         },
//       );
//       if (error.value) {
//         console.error(error.value);
//         return false;
//       }
//       if (data.value?.data.accessToken) {
//         localStorage.setItem("token", data.value.data.accessToken);
//         localStorage.setItem("userId", data.value.data.user.id);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.log("login failed", error);
//       return false;
//     }
//   };
//   return {
//     login,
//   };
// };


import type { LoginResponse } from "~/types/auth";

export const useAuth = () => {
  const config = useRuntimeConfig();

  const login = async (
    phoneNumber: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await $fetch<LoginResponse>("/auth/login", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: {
          phoneNumber,
          password,
        },
      });

      if (response?.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data.user.id);

        return true;
      }

      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  return {
    login,
  };
};

import type { User } from "~/types/user"

export const useUsers = () => {
    const config = useRuntimeConfig()

    const createUser = async (user: User) => {
        const { data, error } = await useFetch(
            "/users",
            {
                baseURL: config.public.apiBase,
                method: "POST",
                body: user
            }
        )

        if (error.value) {
            console.error(error.value)
            return false
        }

        return true
    }

    const getUserByID = async (id: string) => {
        const { data, error } = await useFetch<User>(
            `/users/${id}`,
            {
                baseURL: config.public.apiBase,
                method: "GET"
            }
        )
        if (error.value) {
            console.error(error.value)
            return null
        }
 
        return data.value ?? null
    }

    return {
        createUser,
        getUserByID
    }
}
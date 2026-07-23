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

    return {
        createUser
    }
}
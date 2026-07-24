import type { LoginResponse } from "~/types/auth"

export const useAuth = () => {
    const config = useRuntimeConfig()

    const login = async (
        phoneNumber: string,
        password: string
    ) => {
        try {
            const apiBase = config.public.apiBase || "http://192.168.1.133:6767"
            const { data, error } = await useFetch<LoginResponse>(
                `${apiBase}/auth/login`,
                {
                    method: "POST",
                    body: {
                        phoneNumber,
                        password
                    }
                }
            )

            if (error.value) {
                console.error("Login API error:", error.value)
                return false
            }

            const resData = data.value?.data
            if (!resData) {
                console.error("No data field in login response:", data.value)
                return false
            }

            const token = resData.accessToken || resData.token
            const userId = resData.id || resData.userId || resData.user?.id

            if (token) {
                localStorage.setItem("token", token)
            }

            if (userId) {
                localStorage.setItem("userId", String(userId))
            }

            if (token || userId) {
                const { fetchCurrentUser } = useCurrentUser()
                await fetchCurrentUser(true)
                return true
            }

            return false
        } catch (error) {
            console.error("login failed", error)
            return false
        }
    }

    const logout = () => {
        if (!import.meta.server) {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
        }
        const user = useState("currentUser")
        user.value = null
        navigateTo("/login")
    }

    return {
        login,
        logout
    }
}
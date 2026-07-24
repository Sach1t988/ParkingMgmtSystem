import type { User } from "~/types/user"

export const useCurrentUser = () => {
    const { getUserByID } = useUsers()

    // shared across every component that calls useCurrentUser() —
    // fetched once, not re-fetched on every mount unless force=true
    const user = useState<User | null>("currentUser", () => null)

    const fetchCurrentUser = async (force = false) => {
        if (user.value && !force) return
        if (import.meta.server) return

        const id = localStorage.getItem("userId")
        if (!id || id === "undefined" || id === "null") return

        const userData = await getUserByID(id)
        if (userData) {
            user.value = userData
        }
    }

    return {
        user,
        fetchCurrentUser
    }
}
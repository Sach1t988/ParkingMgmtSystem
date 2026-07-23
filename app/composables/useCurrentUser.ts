import type { User } from "~/types/user"

export const useCurrentUser = () => {
    const { getUserByID } = useUsers()

    // shared across every component that calls useCurrentUser() —
    // fetched once, not re-fetched on every mount
    const user = useState<User | null>("currentUser", () => null)

    const fetchCurrentUser = async () => {
        if (user.value) return

        const id = localStorage.getItem("userId")
        if (!id) return

        user.value = await getUserByID(id)
    }

    return {
        user,
        fetchCurrentUser
    }
}
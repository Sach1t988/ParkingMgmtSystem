interface LoginPayload { phoneNumber: string; password: string }
interface AuthenticatedAdmin { id: string; name?: string; phoneNumber?: string; role?: string }
export const useAuth = () => {
  // This is only a UI flag. The real signed session remains HTTP-only.
  const session = useCookie<string | null>('parking_session_state')
  const admin = useState<AuthenticatedAdmin | null>('authenticated-admin', () => null)
  const login = async (payload: LoginPayload) => {
    const response = await $fetch<{ admin: AuthenticatedAdmin }>('/api/auth/login', {
      method: 'POST',
      body: payload
    })
    session.value = 'active'
    admin.value = response.admin
    return admin.value
  }
  const logout = async () => { session.value = null; admin.value = null; await navigateTo('/login') }
  return { admin, login, logout, session }
}

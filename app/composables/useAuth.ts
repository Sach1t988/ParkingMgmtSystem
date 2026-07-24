interface LoginPayload { phoneNumber: string; password: string }
interface AuthenticatedAdmin { id: string; name: string; phoneNumber: string; role: 'ADMIN' }

export const useAuth = () => {
  const session = useCookie<string | null>('parking_session')
  const admin = useState<AuthenticatedAdmin | null>('authenticated-admin', () => null)
  const login = async (payload: LoginPayload) => {
    const response = await $fetch<{ admin: AuthenticatedAdmin }>('/api/auth/login', { method: 'POST', body: payload })
    admin.value = response.admin
    session.value = 'active'
    return response.admin
  }
  const logout = async () => { session.value = null; admin.value = null; await navigateTo('/login') }
  return { admin, login, logout, session }
}

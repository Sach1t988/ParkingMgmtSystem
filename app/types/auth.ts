export interface LoginResponse {
  success?: boolean
  message?: string
  data: {
    accessToken?: string
    token?: string
    id?: string
    userId?: string
    user?: {
      id: string
      name?: string
      phoneNumber?: string
      role?: string
    }
  }
}
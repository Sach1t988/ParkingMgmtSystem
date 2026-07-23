export interface LoginResponse {
  success: boolean
  data: {
    accessToken: string
    user: {
      id: string
      name: string
      phoneNumber: string
      role: string
    }
  }
}
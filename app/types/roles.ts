export interface Role {
  _id: string
  name: string
  permissions: string[]
}

export interface RolesResponse {
  success: boolean
  data: Role[]
}
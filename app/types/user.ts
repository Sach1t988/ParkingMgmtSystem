// export interface User {
//     id?: string
//     name: string
//     phoneNumber: string
//     password: string
//     role: string
//     isActive: boolean
// }

export interface Role {
  _id: string;
  name: string;
  permissions: string[];
}

export interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  role: Role;
}

export interface UserResponse {
    success: boolean
    data: User[]
}

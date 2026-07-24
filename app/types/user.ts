import type { Role } from "~/types/roles";

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

export interface CreateUserRequest {
  name: string;
  phoneNumber: string;
  password: string;
  role: string;
  isActive: boolean;
}

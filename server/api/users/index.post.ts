import { scryptSync } from 'node:crypto'
import { createError, readBody, setResponseStatus } from 'h3'
import { readUsers, type ManagedUser, type UserRole } from './index.get'

const phonePattern = /^\+?[1-9]\d{7,14}$/
const roles: UserRole[] = ['ADMIN', 'MANAGER', 'OPERATOR', 'STAFF']

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string; phoneNumber?: string; password?: string; role?: UserRole; vehiclePlate?: string; isActive?: boolean }>(event)
  if (!body.name?.trim() || !body.phoneNumber || !phonePattern.test(body.phoneNumber) || !body.password || body.password.length < 8 || !body.role || !roles.includes(body.role) || !body.vehiclePlate?.trim()) throw createError({ statusCode: 400, statusMessage: 'Provide a name, valid phone number, 8-character password, role, and vehicle plate.' })
  const users = await readUsers()
  if (users.some((user) => user.phoneNumber === body.phoneNumber)) throw createError({ statusCode: 409, statusMessage: 'A user already has this phone number.' })
  const user: ManagedUser = { id: crypto.randomUUID(), name: body.name.trim(), phoneNumber: body.phoneNumber, role: body.role, vehiclePlate: body.vehiclePlate.trim().toUpperCase(), isActive: body.isActive ?? true, passwordHash: scryptSync(body.password, 'parking-user-password-salt', 64).toString('hex') }
  await useStorage('data').setItem('parking:users', [...users, user])
  const { passwordHash: _, ...safeUser } = user
  setResponseStatus(event, 201)
  return { user: safeUser }
})

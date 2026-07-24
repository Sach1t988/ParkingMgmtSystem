import { createError, getQuery } from 'h3'

export type UserRole = 'ADMIN' | 'MANAGER' | 'OPERATOR' | 'STAFF'
export interface ManagedUser { id: string; name: string; phoneNumber: string; role: UserRole; vehiclePlate: string; isActive: boolean; passwordHash: string }
const storageKey = 'parking:users'
const initialUsers: ManagedUser[] = [{ id: 'admin-1', name: 'System Administrator', phoneNumber: '9800000000', role: 'ADMIN', vehiclePlate: 'BA-1-PA-0001', isActive: true, passwordHash: 'hashed-admin-password' }]

export async function readUsers() {
  const storage = useStorage('data')
  const saved = await storage.getItem<ManagedUser[]>(storageKey)
  if (saved) return saved
  await storage.setItem(storageKey, initialUsers)
  return initialUsers
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(query.pageSize) || 10))
  const search = String(query.search || '').trim().toLowerCase()
  const role = String(query.role || '') as UserRole | ''
  if (role && !['ADMIN', 'MANAGER', 'OPERATOR', 'STAFF'].includes(role)) throw createError({ statusCode: 400, statusMessage: 'Invalid role' })
  const allUsers = await readUsers()
  const filtered = allUsers.filter((user) => (!role || user.role === role) && (!search || [user.name, user.phoneNumber, user.vehiclePlate].some((value) => value.toLowerCase().includes(search))))
  return { users: filtered.slice((page - 1) * pageSize, page * pageSize).map(({ passwordHash: _, ...user }) => user), total: filtered.length, page, pageSize, active: allUsers.filter((user) => user.isActive).length, admins: allUsers.filter((user) => user.role === 'ADMIN').length }
})

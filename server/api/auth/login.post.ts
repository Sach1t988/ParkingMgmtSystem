import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto'
import { createError, readBody, setCookie } from 'h3'

const SESSION_SECRET = process.env.NUXT_SESSION_SECRET || 'change-this-development-session-secret'
const ADMIN = { id: 'admin-1', name: 'System Administrator', phoneNumber: '9800000000', role: 'ADMIN' as const }
// scrypt hash of the development password `admin123`; use a unique salt per user with a database in production.
const ADMIN_PASSWORD_HASH = '74b9df04a5c141da31bdcbc5c6f8a96e2a6cfb2525162094ea74025d3a9f6ce40c2410c190d8281c6f329c0a8215ec6a23b09ab62f6b903e43b3786b170f1b66'
const passwordHash = (value: string) => scryptSync(value, 'parking-admin-password-salt', 64).toString('hex')

export function verifySessionToken(token: string) {
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  const expected = createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false
  try { const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { role: string; expiresAt: number }; return session.role === 'ADMIN' && session.expiresAt > Date.now() } catch { return false }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ phoneNumber?: string; password?: string }>(event)
  if (body.phoneNumber !== ADMIN.phoneNumber || !body.password || passwordHash(body.password) !== ADMIN_PASSWORD_HASH) throw createError({ statusCode: 401, statusMessage: 'Invalid administrator credentials' })
  const payload = Buffer.from(JSON.stringify({ ...ADMIN, expiresAt: Date.now() + 28_800_000 })).toString('base64url')
  const token = `${payload}.${createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')}`
  setCookie(event, 'parking_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 28_800, path: '/' })
  return { admin: ADMIN }
})

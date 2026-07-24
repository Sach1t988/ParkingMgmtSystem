import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError, readBody, setCookie } from 'h3'

const SESSION_SECRET = process.env.NUXT_SESSION_SECRET || 'change-this-development-session-secret'

interface BackendAdmin {
  id: string
  name?: string
  phoneNumber?: string
  role?: string
}

interface BackendLoginResponse {
  success?: boolean
  data?: { accessToken?: string; user?: BackendAdmin }
}

export function verifySessionToken(token: string) {
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false
  const expected = createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { role: string; expiresAt: number }
    return session.role === 'ADMIN' && session.expiresAt > Date.now()
  } catch { return false }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ phoneNumber?: string; password?: string }>(event)
  const apiBase = useRuntimeConfig(event).public.apiBase.replace(/\/$/, '')
  if (!apiBase || !body.phoneNumber || !body.password) throw createError({ statusCode: 400, statusMessage: 'Phone number, password, and NUXT_PUBLIC_API_BASE are required.' })

  let backend: BackendLoginResponse
  try {
    backend = await $fetch<BackendLoginResponse>(`${apiBase}/auth/login`, { method: 'POST', body })
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid administrator credentials' })
  }

  const admin = backend.data?.user
  if (!backend.data?.accessToken || !admin || admin.role?.toUpperCase() !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Administrator access is required' })

  const payload = Buffer.from(JSON.stringify({ id: admin.id, role: 'ADMIN', expiresAt: Date.now() + 28_800_000 })).toString('base64url')
  const token = `${payload}.${createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')}`
  const cookieOptions = { sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', maxAge: 28_800, path: '/' }
  setCookie(event, 'parking_session', token, { ...cookieOptions, httpOnly: true })
  setCookie(event, 'parking_session_state', 'active', cookieOptions)
  return { admin }
})

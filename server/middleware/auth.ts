import { createError, getCookie } from 'h3'
import { verifySessionToken } from '../api/auth/login.post'
export default defineEventHandler((event) => {
  if (!event.path.startsWith('/api/') || event.path === '/api/auth/login') return
  const token = getCookie(event, 'parking_session')
  if (!token || !verifySessionToken(token)) throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
})

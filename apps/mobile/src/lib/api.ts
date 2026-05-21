import { env } from './env'
import { supabase } from './supabase'

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const url = path.startsWith('http') ? path : `${env.apiBaseUrl}${path}`
  const auth = await authHeader()
  const headers = {
    'Content-Type': 'application/json',
    ...auth,
    ...(init.headers as Record<string, string> | undefined),
  }
  return fetch(url, { ...init, headers })
}

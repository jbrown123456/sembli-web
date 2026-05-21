import Constants from 'expo-constants'

type Extra = {
  appVariant?: 'development' | 'preview' | 'production'
  supabaseUrl?: string
  supabaseAnonKey?: string
  apiBaseUrl?: string
}

const extra = (Constants.expoConfig?.extra ?? {}) as Extra

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required env "${name}". Set it in your .env file or via app.config.ts extra.`,
    )
  }
  return value
}

export const env = {
  appVariant: extra.appVariant ?? 'development',
  supabaseUrl: required('EXPO_PUBLIC_SUPABASE_URL', extra.supabaseUrl),
  supabaseAnonKey: required('EXPO_PUBLIC_SUPABASE_ANON_KEY', extra.supabaseAnonKey),
  apiBaseUrl: required('EXPO_PUBLIC_API_BASE_URL', extra.apiBaseUrl),
} as const

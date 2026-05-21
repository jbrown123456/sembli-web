import type { ExpoConfig, ConfigContext } from 'expo/config'

const APP_VARIANT = process.env.APP_VARIANT ?? 'development'

const IDENTIFIERS = {
  development: {
    bundleId: 'com.sembli.app.dev',
    name: 'Sembli (Dev)',
    icon: './assets/icon.png',
  },
  preview: {
    bundleId: 'com.sembli.app.preview',
    name: 'Sembli (Preview)',
    icon: './assets/icon.png',
  },
  production: {
    bundleId: 'com.sembli.app',
    name: 'Sembli',
    icon: './assets/icon.png',
  },
} as const

type Variant = keyof typeof IDENTIFIERS
const variant: Variant = (APP_VARIANT as Variant) in IDENTIFIERS ? (APP_VARIANT as Variant) : 'development'
const ids = IDENTIFIERS[variant]

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: ids.name,
  slug: 'sembli',
  scheme: 'sembli',
  version: '0.1.0',
  orientation: 'portrait',
  icon: ids.icon,
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#FBF8F1',
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: ids.bundleId,
    infoPlist: {
      NSCameraUsageDescription:
        'Sembli uses the camera to capture photos of your home assets so we can extract details automatically.',
      NSPhotoLibraryUsageDescription:
        'Sembli uses photo library access to attach images of your home assets and receipts.',
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: ids.bundleId,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FBF8F1',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-font', 'expo-secure-store'],
  extra: {
    appVariant: variant,
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
    apiBaseUrl:
      process.env.EXPO_PUBLIC_API_BASE_URL ??
      (variant === 'production' ? 'https://sembli.com' : 'http://localhost:3000'),
    eas: {
      projectId: process.env.EAS_PROJECT_ID ?? '',
    },
  },
})

# Sembli mobile (Expo)

The Sembli iOS / Android app, built with Expo (React Native + TypeScript). Routing uses `react-navigation`, not `expo-router` (decision recorded in SEM-10).

This package is part of the sembli-v3 pnpm workspace and is published as `mobile`.

## First-time setup

```bash
# from the repo root
pnpm install

# copy the env template and fill in real values
cp apps/mobile/.env.example apps/mobile/.env
```

You'll need values for:

- `EXPO_PUBLIC_SUPABASE_URL` — same project URL the web app uses.
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` — the public anon key from Supabase.
- `EXPO_PUBLIC_API_BASE_URL` — where to reach the Next.js backend (`http://localhost:3000` for dev against a local Next.js server; the production hostname later).

## Run on iOS Simulator

```bash
pnpm -F mobile start
# in another terminal, press `i` to open the iOS Simulator
```

If you need a custom dev client (for `expo-secure-store`, push notifications, etc.):

```bash
pnpm -F mobile prebuild
pnpm -F mobile ios
```

## Build with EAS

```bash
# Development client (simulator)
eas build --profile development --platform ios

# Internal preview (TestFlight-style)
eas build --profile preview --platform ios

# App Store production
eas build --profile production --platform ios
eas submit --profile production --platform ios
```

Each profile sets `APP_VARIANT` so you get separate bundle identifiers
(`com.sembli.app.dev` / `.preview` / `com.sembli.app`) and installable apps side-by-side.

## Layout

```
apps/mobile/
├── App.tsx                 # root component (fonts + theme + nav)
├── app.config.ts           # Expo config (bundle id, scheme, env wiring)
├── eas.json                # EAS build/submit profiles
├── assets/                 # icons, splash
└── src/
    ├── components/         # shared UI primitives (TabIcons, etc.)
    ├── lib/
    │   ├── env.ts          # typed env via expo-constants
    │   ├── supabase.ts     # Supabase client with SecureStore adapter
    │   └── api.ts          # authed fetch helper for backend API
    ├── navigation/         # React Navigation stacks + tabs
    ├── screens/            # one folder per flow (onboarding/, main/)
    └── theme/              # Shopify Restyle theme + tokens
```

## Conventions

- **No cookies.** We use Bearer tokens via the Supabase JS client and `expo-secure-store`.
- **Use the helper.** Always go through `src/lib/api.ts` for backend calls so the access token is attached.
- **Match the web design system.** Tokens live in `src/theme/tokens.ts` and mirror the web Tailwind palette.

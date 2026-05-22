import * as WebBrowser from 'expo-web-browser'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Path } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../theme/tokens'

type LinkRow = { label: string; sub?: string; url: string }

const ABOUT_LEGAL: LinkRow[] = [
  { label: 'Privacy Policy', sub: 'sembli.co/privacy', url: 'https://sembli.co/privacy' },
  { label: 'Terms of Service', sub: 'sembli.co/terms', url: 'https://sembli.co/terms' },
  { label: 'Support', sub: 'sembli.co/support', url: 'https://sembli.co/support' },
]

function ChevronRight({ color = colors.muted }: { color?: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M9 6l6 6-6 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  )
}

function CloseIcon({ color = colors.ink }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  )
}

async function openExternal(url: string) {
  try {
    await WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      controlsColor: colors.ink,
      toolbarColor: colors.bg,
    })
  } catch (err) {
    console.warn('Failed to open URL', url, err)
  }
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Close settings"
          style={styles.closeBtn}
          activeOpacity={0.6}
        >
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.closeBtn} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ABOUT / LEGAL</Text>
          <View style={styles.card}>
            {ABOUT_LEGAL.map((row, i) => (
              <TouchableOpacity
                key={row.url}
                onPress={() => openExternal(row.url)}
                style={[styles.row, i > 0 && styles.rowBorder]}
                accessibilityRole="link"
                accessibilityLabel={`${row.label}, opens in browser`}
                activeOpacity={0.6}
              >
                <View style={styles.rowText}>
                  <Text style={styles.rowLabel}>{row.label}</Text>
                  {row.sub ? <Text style={styles.rowSub}>{row.sub}</Text> : null}
                </View>
                <ChevronRight />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.footnote}>Sembli — home maintenance, made calm.</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 14,
  },
  closeBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: 'Fraunces_400Regular', fontSize: 20, letterSpacing: -0.4, color: colors.ink },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 18, paddingTop: 8 },

  section: { marginBottom: 24 },
  sectionLabel: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 10,
    color: colors.muted,
    letterSpacing: 0.6,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.borderSoft },
  rowText: { flex: 1 },
  rowLabel: { fontFamily: 'Inter_500Medium', fontSize: 14, color: colors.ink },
  rowSub: {
    fontFamily: 'JetBrainsMono_400Regular',
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
    letterSpacing: 0.2,
  },

  footnote: {
    fontFamily: 'Fraunces_400Regular_Italic',
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 8,
  },
})

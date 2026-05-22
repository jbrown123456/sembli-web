import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Support — Sembli' }

const COPYRIGHT_YEAR = '2026'
// Legal entity name pending board confirmation (tracked on SEM-20).
// Substitute the finalized legal name here before App Store go-live.
const COPYRIGHT_HOLDER = 'Sembli'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: 22,
          fontWeight: 400,
          letterSpacing: '-0.03em',
          color: '#1A1814',
          margin: '0 0 14px',
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(26,24,20,0.75)' }}>
        {children}
      </div>
    </section>
  )
}

const inlineLink = { color: '#1A1814', fontWeight: 600 } as const

export default function SupportPage() {
  return (
    <div
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: '72px 24px 80px',
        color: '#1A1814',
      }}
    >
      {/* Nav */}
      <div style={{ marginBottom: 48 }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(26,24,20,0.4)',
            textDecoration: 'none',
          }}
        >
          ← Sembli
        </Link>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 40,
            fontWeight: 400,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: '#1A1814',
            margin: 0,
          }}
        >
          Support
        </h1>
      </div>

      <Section title="We’re here to help">
        <p>
          Sembli is built by a small team. Email us and a human will reply — usually within 2 business
          days, often sooner.
        </p>
        <p style={{ marginTop: 16, fontSize: 18 }}>
          <a href="mailto:support@sembli.co" style={inlineLink}>support@sembli.co</a>
        </p>
      </Section>

      <Section title="Common topics">
        <p>
          We&rsquo;ll expand this section as we hear from real users. For now, please reach out by
          email for any of the following:
        </p>
        <ul style={{ paddingLeft: 20, marginTop: 12 }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Account / sign-in issues</strong> — can&rsquo;t log in, password reset, can&rsquo;t
            change email.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Sync or data issues</strong> — task you entered isn&rsquo;t showing up, data
            missing on a device.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>AI responses</strong> — anything Sembli said that was wrong, confusing, or
            unexpected.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Billing</strong> — questions about your subscription (when available).
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Privacy / data requests</strong> — see our{' '}
            <Link href="/privacy" style={inlineLink}>Privacy Policy</Link> for the full list of
            rights. Email us to exercise any of them.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Bug reports &amp; feature requests</strong> — we read every one of these.
          </li>
        </ul>

        <p style={{ marginTop: 16 }}>When emailing, please include:</p>
        <ol style={{ paddingLeft: 20, marginTop: 8 }}>
          <li style={{ marginBottom: 6 }}>Your account email (the one you use to sign in).</li>
          <li style={{ marginBottom: 6 }}>Your device + Sembli app version (Settings → About).</li>
          <li style={{ marginBottom: 6 }}>
            A short description of the issue and what you were doing when it happened.
          </li>
          <li style={{ marginBottom: 6 }}>A screenshot if possible.</li>
        </ol>
      </Section>

      <Section title="Privacy">
        <p>
          For data access, deletion, or export requests, see the{' '}
          <Link href="/privacy" style={inlineLink}>Privacy Policy</Link> — or email us and we&rsquo;ll
          handle it.
        </p>
      </Section>

      {/* Footer nav */}
      <div
        style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: '1px solid rgba(26,24,20,0.08)',
          display: 'flex',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {[['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Cookie Policy', '/cookies']].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              color: 'rgba(26,24,20,0.4)',
              textDecoration: 'none',
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: 11,
          letterSpacing: '0.04em',
          color: 'rgba(26,24,20,0.4)',
        }}
      >
        © {COPYRIGHT_YEAR} {COPYRIGHT_HOLDER}. All rights reserved.
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Privacy Policy — Sembli' }

const LAST_UPDATED = 'May 2026'
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
      <div
        style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: 'rgba(26,24,20,0.75)',
        }}
      >
        {children}
      </div>
    </section>
  )
}

const inlineLink = { color: '#1A1814', fontWeight: 600 } as const

export default function PrivacyPage() {
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
        <div
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(26,24,20,0.4)',
            marginBottom: 12,
          }}
        >
          Last updated: {LAST_UPDATED}
        </div>
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
          Privacy Policy
        </h1>
      </div>

      <Section title="Overview">
        <p>
          Sembli (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) makes a mobile and web application
          that helps homeowners track and remember home-maintenance tasks. This Privacy Policy explains what
          we collect, how we use it, who we share it with, and the rights you have over your data.
        </p>
      </Section>

      <Section title="1. Information we collect">
        <p>We collect only what we need to run the product.</p>

        <p style={{ marginTop: 16 }}><strong>Account information</strong></p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li style={{ marginBottom: 6 }}>
            Email address — used to create your account, sign you in, and send you essential service
            messages (password resets, security notices, important product updates). We do not send
            marketing emails without your explicit opt-in.
          </li>
        </ul>

        <p style={{ marginTop: 16 }}><strong>Maintenance content you create</strong></p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li style={{ marginBottom: 6 }}>
            Tasks, notes, photos, schedules, and home details you enter into Sembli. This content is
            yours and is stored to provide the service back to you.
          </li>
        </ul>

        <p style={{ marginTop: 16 }}><strong>Conversational AI inputs</strong></p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li style={{ marginBottom: 6 }}>
            When you use Sembli&rsquo;s AI features, the message text you send and the relevant context
            from your maintenance content is sent to our AI processor (Anthropic, see §3) to generate
            a response. We do not use these inputs to train any model — Anthropic does not train on API
            content by default, and Sembli has not opted into any training arrangement.
          </li>
        </ul>

        <p style={{ marginTop: 16 }}><strong>Optional product analytics</strong></p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li style={{ marginBottom: 6 }}>
            Aggregate, non-identifying usage metrics (e.g. screens viewed, feature usage, crashes).
            Analytics are opt-in on first launch and can be turned off at any time in Settings. If you
            opt out, we collect none of this.
          </li>
        </ul>

        <p style={{ marginTop: 16 }}><strong>Information collected automatically</strong></p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li style={{ marginBottom: 6 }}>
            Basic device/app metadata required to deliver the service: app version, OS version, IP
            address (at request time, not stored long-term), and authentication tokens.
          </li>
        </ul>

        <p style={{ marginTop: 16 }}>
          We <strong>do not</strong> collect: precise location, contacts, microphone, camera (unless
          you explicitly attach a photo to a maintenance task), advertising identifiers, or any data
          for advertising purposes.
        </p>
      </Section>

      <Section title="2. How we use information">
        <ul style={{ paddingLeft: 20, marginTop: 0 }}>
          <li style={{ marginBottom: 6 }}>To provide and operate Sembli (sign-in, sync, AI responses, reminders).</li>
          <li style={{ marginBottom: 6 }}>To respond to your support requests.</li>
          <li style={{ marginBottom: 6 }}>To detect abuse, fraud, and security incidents.</li>
          <li style={{ marginBottom: 6 }}>To comply with legal obligations.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          We do not sell your personal information. We do not share your information with third-party
          advertisers.
        </p>
      </Section>

      <Section title="3. Third-party processors">
        <p>
          We use a small set of vendors strictly to operate the service. They process data on our
          behalf under contractual obligations.
        </p>
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                {['Vendor', 'Purpose', 'Data shared'].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: 'left',
                      padding: '8px 10px',
                      borderBottom: '1px solid rgba(26,24,20,0.15)',
                      fontFamily: 'var(--font-jetbrains-mono)',
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'rgba(26,24,20,0.55)',
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Supabase (Supabase Inc.)', 'Authentication and database hosting', 'Email, maintenance content, account metadata'],
                ['Anthropic (Anthropic PBC)', 'AI text processing for Sembli’s AI features', 'Your AI message text and the relevant maintenance context for that request'],
                ['Apple (Apple Inc.)', 'App distribution and (if enabled) push notifications', 'Standard App Store / APNs metadata'],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid rgba(26,24,20,0.08)',
                        verticalAlign: 'top',
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12 }}>We will update this table when processors change.</p>
      </Section>

      <Section title="4. Where data is stored">
        <p>
          Sembli&rsquo;s primary infrastructure is hosted in the United States. If you use Sembli from
          outside the U.S., your data is transferred to and processed in the U.S., subject to
          appropriate safeguards.
        </p>
      </Section>

      <Section title="5. How long we keep data">
        <ul style={{ paddingLeft: 20, marginTop: 0 }}>
          <li style={{ marginBottom: 6 }}>Account data: as long as your account exists.</li>
          <li style={{ marginBottom: 6 }}>
            AI conversation history: stored in your account so you can reference past Sembli answers;
            deletable per-message in the app.
          </li>
          <li style={{ marginBottom: 6 }}>Backups: up to 30 days after deletion.</li>
          <li style={{ marginBottom: 6 }}>
            Aggregate analytics (if you opted in): retained in aggregated form indefinitely; no
            identifiable retention.
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          When you delete your account, we delete your account data within 30 days, except where
          retention is required by law (e.g. financial records).
        </p>
      </Section>

      <Section title="6. Your rights">
        <p>Regardless of where you live, you can:</p>
        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
          <li style={{ marginBottom: 6 }}><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
          <li style={{ marginBottom: 6 }}><strong>Correct</strong> — update inaccurate information directly in the app, or contact us.</li>
          <li style={{ marginBottom: 6 }}><strong>Delete</strong> — delete your account from the app, or contact us. Backups are purged within 30 days.</li>
          <li style={{ marginBottom: 6 }}><strong>Export</strong> — request a portable export of your maintenance content.</li>
          <li style={{ marginBottom: 6 }}><strong>Opt out</strong> of analytics at any time in Settings.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          Residents of the EU/UK (GDPR), California (CCPA/CPRA), Virginia (VCDPA), and other states
          with comparable laws have these rights as a matter of law. To exercise any right, email{' '}
          <a href="mailto:support@sembli.co" style={inlineLink}>support@sembli.co</a>. We respond
          within 30 days.
        </p>
        <p style={{ marginTop: 12 }}>
          We do not sell or &ldquo;share&rdquo; personal information for cross-context behavioral
          advertising (as defined under the CCPA/CPRA).
        </p>
      </Section>

      <Section title="7. Security">
        <p>
          We use industry-standard safeguards including TLS in transit, encryption at rest for stored
          data, scoped access controls, and audit logging. No method of transmission or storage is
          perfectly secure; we will notify affected users promptly if a security incident requires it.
        </p>
      </Section>

      <Section title="8. Children">
        <p>
          Sembli is not directed to children under 13 (under 16 in some jurisdictions). We do not
          knowingly collect personal information from children. If we learn we have collected
          information from a child, we will delete it. Parents or guardians who believe their child
          has provided information to us can contact{' '}
          <a href="mailto:support@sembli.co" style={inlineLink}>support@sembli.co</a>.
        </p>
      </Section>

      <Section title="9. Changes to this policy">
        <p>
          We will post any updates to this page and update the &ldquo;Last updated&rdquo; date above.
          Material changes (new data categories, new processors, expanded uses) will be communicated
          by email to active accounts.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions, requests, or complaints:{' '}
          <a href="mailto:support@sembli.co" style={inlineLink}>support@sembli.co</a>
        </p>
        <p style={{ marginTop: 12 }}>
          If you have an unresolved concern, EU/UK residents may also contact their local data
          protection authority.
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
        {[['Support', '/support'], ['Terms of Service', '/terms'], ['Cookie Policy', '/cookies']].map(([label, href]) => (
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

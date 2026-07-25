'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import type { ComponentType } from 'react'
import { RevealWords } from './motion-primitives'
import { SectionLabel } from './section-label'
import { Magnetic } from './magnetic'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  )
}

const socials: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  href: string
}[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'praveen200529@gmail.com',
    href: 'mailto:praveen200529@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 93605 39078',
    href: 'tel:+919360539078',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: '/in/praveenp200529',
    href: 'https://linkedin.com/in/praveenp200529',
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: '@praveen200529-prog',
    href: 'https://github.com/praveen200529-prog',
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-6xl px-5 py-28 sm:px-8"
    >
      <SectionLabel index="06" title="Contact" />

      <div className="mt-10 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="max-w-2xl text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            <RevealWords text="Let's build something worth remembering." />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground"
          >
            Whether you&apos;re a recruiter, founder or engineer — if you&apos;re
            working on something ambitious, I&apos;d love to hear about it. My
            inbox is always open.
          </motion.p>

          <Magnetic>
            <a
              href="mailto:praveen200529@gmail.com?subject=Hello%20Praveen"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              Start Conversation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 gap-3 self-start sm:grid-cols-2">
          {socials.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-4 backdrop-blur transition-all hover:border-accent/40 hover:bg-card/70"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/60 text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="truncate text-sm font-medium">{s.value}</p>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </motion.a>
            )
          })}
        </div>
      </div>

      <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Praveen P. Built with intent.</p>
        <p className="font-mono text-xs">Madurai, Tamil Nadu · India</p>
      </footer>
    </section>
  )
}

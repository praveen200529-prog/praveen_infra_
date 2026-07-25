'use client'

import { motion } from 'motion/react'
import { Award, BadgeCheck, Building2, Calendar } from 'lucide-react'
import { Reveal } from './motion-primitives'
import { SectionLabel } from './section-label'

const contributions = [
  'Underwent end-to-end SDLC training — requirements, system design, business logic, database architecture, REST APIs and deployment.',
  'Collaborated directly with the civil construction team to translate real financial workflows into structured technical solutions.',
  'Designed relational schemas, normalized MySQL tables and JWT-secured REST APIs with enterprise-grade architecture.',
  'Delivered BillX — a fully functional, production-deployed platform — as the primary output of the internship.',
]

export function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 mx-auto max-w-6xl px-5 py-28 sm:px-8"
    >
      <SectionLabel index="03" title="Experience" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Role narrative */}
        <div>
          <Reveal>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-accent">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-2xl font-medium tracking-tight">
                  Software Developer Intern
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Kandhan Infra Private Limited · Madurai
                </p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-accent" />
                  May 2025 — Jun 2026 · Remote, alongside MCA
                </div>
              </div>
            </div>
          </Reveal>

          <ol className="mt-8 space-y-5 border-l border-border pl-6">
            {contributions.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="relative">
                  <span className="absolute -left-[1.65rem] top-1.5 flex h-3 w-3 items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="absolute h-3 w-3 rounded-full bg-accent/30" />
                  </span>
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    {c}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Certificate card */}
        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                <Award className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Certificate of Completion
            </p>
            <h4 className="mt-2 text-xl font-medium leading-snug">
              BuildManager CPMS / BillX
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Awarded by Kandhan Infra Pvt. Ltd. for successful delivery of a
              full-stack construction financial intelligence platform.
            </p>

            <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <Row label="Performance" value="Outstanding" highlight />
              <Row label="Duration" value="Jan — Jun 2026" />
              <Row label="Tech" value="React · Node · Express · MySQL · JWT" />
              <Row label="Certificate No." value="KI/PC/MCA/2026/003" />
            </dl>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={`text-right font-medium ${
          highlight ? 'text-accent' : 'text-foreground'
        }`}
      >
        {value}
      </dd>
    </div>
  )
}

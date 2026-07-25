'use client'

import { Reveal } from './motion-primitives'
import { SectionLabel } from './section-label'

const milestones = [
  {
    period: '2025 — 2027',
    title: 'Master of Computer Applications (MCA)',
    place: 'K.L.N. College of Engineering, Madurai',
    note: 'Deepening systems thinking while building production software in parallel.',
  },
  {
    period: '2022 — 2025',
    title: 'B.Sc. Computer Science',
    place: 'Madura College, Madurai',
    note: 'Foundations in algorithms, databases and software engineering.',
  },
  {
    period: '2021 — 2022',
    title: 'Higher Secondary (12th)',
    place: 'Madura College Hr. Sec. School, Madurai',
  },
  {
    period: '2019 — 2020',
    title: 'Secondary (10th)',
    place: 'St. John Peter Matric School, Madurai',
  },
]

export function Education() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionLabel index="05" title="Journey" />
      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-2xl text-balance text-3xl font-medium tracking-tight sm:text-4xl">
          Milestones in a continuous learning path.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
        {milestones.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.08}>
            <div className="h-full bg-background/60 p-7 backdrop-blur transition-colors hover:bg-card/60">
              <p className="font-mono text-xs text-accent">{m.period}</p>
              <h3 className="mt-3 text-lg font-medium leading-snug">
                {m.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.place}</p>
              {m.note && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
                  {m.note}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

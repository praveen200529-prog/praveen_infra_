'use client'

import { Reveal, RevealWords } from './motion-primitives'
import { SectionLabel } from './section-label'

const stats = [
  { value: '30+', label: 'Normalized MySQL tables architected' },
  { value: '4', label: 'RBAC roles secured end-to-end' },
  { value: '20+', label: 'Man-hours saved per project cycle' },
  { value: '<2s', label: 'Dashboard load on production' },
]

export function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionLabel index="01" title="About" />

      <div className="mt-10 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="max-w-2xl text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <RevealWords text="I don't just write code — I translate real business problems into reliable, scalable systems." />
          </h2>

          <div className="mt-8 max-w-xl space-y-5 text-pretty leading-relaxed text-muted-foreground">
            <Reveal delay={0.1}>
              <p>
                My path into software started with a simple obsession: making
                messy, manual processes feel effortless. During my internship at
                Kandhan Infra, I sat with civil engineers and accountants,
                learned how construction finance actually works, and rebuilt it
                as software.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                I care about the whole lifecycle — from wireframes and database
                schemas to JWT-secured APIs and production deployment. I believe
                the best engineers understand the business as deeply as the
                stack, and I build with both in mind.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-card/50 p-5 backdrop-blur transition-colors hover:border-accent/40">
                <p className="font-serif text-4xl text-accent">{s.value}</p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

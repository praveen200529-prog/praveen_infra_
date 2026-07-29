'use client'

import { Code2, Database, Server, ShieldCheck, Wrench } from 'lucide-react'
import { Reveal } from './motion-primitives'
import { SectionLabel } from './section-label'

const groups = [
  {
    icon: Code2,
    title: 'Frontend',
    blurb: 'Component-driven interfaces that stay fast and readable at scale.',
    items: ['React.js', 'Responsive UI', 'Component Architecture', 'HTML / CSS'],
  },
  {
    icon: Server,
    title: 'Backend',
    blurb: 'REST APIs and business logic built for reliability.',
    items: ['Node.js', 'Express.js', 'REST API', 'Java', 'Python'],
  },
  {
    icon: Database,
    title: 'Data',
    blurb: 'Normalized relational schemas engineered for integrity.',
    items: ['MySQL', 'Database Normalization', 'SQL', '30+ tables'],
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    blurb: 'Auth and access control that protects every route.',
    items: ['JWT Authentication', 'Role-Based Access (RBAC)', '4-role model'],
  },
  {
    icon: Wrench,
    title: 'Tooling & Practice',
    blurb: 'The workflow behind shipping production software.',
    items: ['Git & GitHub', 'Vercel', 'Agile / SDLC', 'VS Code'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <SectionLabel index="02" title="Capabilities" />
      <Reveal delay={0.05}>
        <h2 className="mt-8 max-w-2xl text-balance text-3xl font-medium tracking-tight sm:text-4xl">
          A software developer toolkit, used with intent.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => {
          const Icon = g.icon
          const wide = i === 4
          return (
            <Reveal key={g.title} delay={i * 0.07} className={wide ? 'lg:col-span-1' : ''}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/40 p-6 backdrop-blur transition-all duration-500 hover:border-accent/40 hover:bg-card/70">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-medium">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                  {g.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}

        {/* Signature statement card */}
        <Reveal delay={0.35}>
          <div className="flex h-full flex-col justify-between rounded-3xl border border-accent/30 bg-accent/10 p-6 backdrop-blur">
            <p className="font-serif text-2xl italic leading-snug text-foreground">
              &ldquo;Understand the business as deeply as the stack.&rdquo;
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              The principle behind everything I ship.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

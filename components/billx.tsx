'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  FileSpreadsheet,
  LineChart,
  Lock,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { Reveal } from './motion-primitives'
import { SectionLabel } from './section-label'

const features = [
  {
    icon: Wallet,
    title: 'BOQ & Budget Intelligence',
    desc: 'Bill-of-quantities management with instant variance flags — surfacing cost overruns the moment they happen instead of weeks later.',
  },
  {
    icon: TrendingUp,
    title: 'Auto-Generated Financials',
    desc: 'Profit & Loss, Balance Sheet and Cash Flow statements built live from project data, with real-time ROI, IRR and Net Profit.',
  },
  {
    icon: Lock,
    title: 'RBAC-Secured Access',
    desc: 'JWT-authenticated REST APIs with a four-role model — Admin, Manager, Engineer and Investor — each seeing exactly what they should.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Excel Automation',
    desc: 'Engineered import/export pipelines that replaced hours of manual spreadsheet work every project cycle.',
  },
]

const metrics = [
  { icon: BarChart3, value: '30+', label: 'Normalized MySQL tables' },
  { icon: Lock, value: '4', label: 'RBAC roles' },
  { icon: LineChart, value: '<2s', label: 'Dashboard load' },
  { icon: TrendingUp, value: '100%', label: 'Production deployed' },
]

export function BillX() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -3])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1])

  return (
    <section
      id="billx"
      className="relative z-10 border-y border-border bg-card/20 py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="04" title="Flagship Project" />
            <Reveal delay={0.05}>
              <h2 className="mt-8 flex items-baseline gap-3 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                BillX
                <span className="font-serif text-2xl italic text-accent sm:text-3xl">
                  the finance OS for construction
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="https://billx.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
            >
              Visit live app
              <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        {/* Problem / Solution */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-border bg-background/40 p-7 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                The problem
              </p>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Construction firms tracked budgets across scattered
                spreadsheets. Cost overruns surfaced weeks too late, financial
                statements depended on external accountants, and stakeholders
                had no shared source of truth.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-accent/30 bg-accent/[0.06] p-7 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                The solution
              </p>
              <p className="mt-3 text-pretty leading-relaxed text-foreground/90">
                A production-grade SaaS platform managing the entire financial
                lifecycle — Projects, BOQ, RA Billing, Budgeting, Expenses and
                Investor Fund Monitoring — delivering real-time budget
                intelligence in a single, role-aware dashboard.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Dashboard showcase in browser mockup */}
        <div ref={ref} className="relative mt-16" style={{ perspective: 1200 }}>
          <motion.div
            style={{ y: imgY, rotateX: rotate, scale }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50"
          >
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-background/70 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
              <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
              <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
              <div className="ml-4 flex-1 rounded-md border border-border bg-card px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
                billx.vercel.app/projects
              </div>
            </div>
            <img
              src="/billx-dashboard.png"
              alt="BillX dashboard showing budget vs actual cost charts, cost breakdown and monthly cost trend"
              className="w-full"
            />
          </motion.div>

          {/* floating stat panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="animate-float-slow absolute -bottom-6 left-2 origin-bottom-left scale-90 rounded-2xl border border-border bg-background/80 px-4 py-3 backdrop-blur-xl sm:scale-100 sm:px-5 sm:py-4"
          >
            <p className="text-xs text-muted-foreground">Live variance alert</p>
            <p className="mt-1 font-serif text-2xl text-accent">₹53,998</p>
            <p className="text-xs text-muted-foreground">flagged over budget</p>
          </motion.div>
        </div>

        {/* Metrics */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((m, i) => {
            const Icon = m.icon
            return (
              <Reveal key={m.label} delay={i * 0.07}>
                <div className="rounded-2xl border border-border bg-background/40 p-5 backdrop-blur">
                  <Icon className="h-5 w-5 text-accent" />
                  <p className="mt-4 font-serif text-4xl">{m.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Feature walkthrough */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="group flex h-full gap-5 rounded-3xl border border-border bg-background/40 p-6 backdrop-blur transition-colors hover:border-accent/40">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{f.title}</h3>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

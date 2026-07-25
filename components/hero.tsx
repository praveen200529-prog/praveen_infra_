'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Magnetic } from './magnetic'

const easeOut = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8"
    >
      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for full-stack roles &amp; collaborations
        </motion.div>

        <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
          <Line delay={0.4}>I build software that</Line>
          <Line delay={0.5}>
            solves{' '}
            <span className="font-serif italic text-accent">real business</span>
          </Line>
          <Line delay={0.6}>problems.</Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.9 }}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          I&apos;m <span className="text-foreground">Praveen P</span>, a
          full-stack developer who shipped{' '}
          <span className="text-foreground">BillX</span> — an enterprise
          construction-finance platform — during my internship at Kandhan Infra.
          I work across React, Node.js and MySQL to make complex systems feel
          effortless.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#billx"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              Explore the BillX case study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              Get in touch
            </a>
          </Magnetic>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" />
            Madurai, India
          </span>
        </motion.div>
      </motion.div>

      {/* Portrait, floating with parallax */}
      <motion.div
        style={{ y: photoY }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: easeOut, delay: 0.6 }}
        className="pointer-events-none absolute right-4 top-24 hidden w-64 lg:block xl:right-0 xl:w-72"
      >
        <div className="animate-float-slow">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-black/40">
            <img
              src="/praveen.png"
              alt="Portrait of Praveen P"
              className="h-80 w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-border bg-card/70 px-4 py-3 backdrop-blur">
            <div>
              <p className="text-xs text-muted-foreground">Currently</p>
              <p className="text-sm font-medium">MCA @ K.L.N College</p>
            </div>
            <span className="font-mono text-xs text-accent">2025—27</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  )
}

function Line({
  children,
  delay,
}: {
  children: React.ReactNode
  delay: number
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

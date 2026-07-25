'use client'

import { motion } from 'motion/react'

export function SectionLabel({
  index,
  title,
}: {
  index: string
  title: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-xs text-accent">{index}</span>
      <span className="h-px w-10 bg-accent/50" />
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {title}
      </span>
    </motion.div>
  )
}

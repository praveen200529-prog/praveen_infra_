const items = [
  'React.js',
  'Node.js',
  'Express.js',
  'MySQL',
  'REST API',
  'JWT Auth',
  'RBAC',
  'TypeScript',
  'Database Normalization',
  'Git & GitHub',
  'Vercel',
  'Agile / SDLC',
]

export function Marquee() {
  return (
    <div className="relative z-10 border-y border-border bg-card/30 py-5 backdrop-blur">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap text-lg font-medium text-muted-foreground"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

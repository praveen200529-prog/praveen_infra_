import { SmoothScroll } from '@/components/smooth-scroll'
import { AuroraField } from '@/components/aurora-field'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Experience } from '@/components/experience'
import { BillX } from '@/components/billx'
import { Education } from '@/components/education'
import { Contact } from '@/components/contact'

export default function Page() {
  return (
    <SmoothScroll>
      <AuroraField />
      <SiteNav />
      <main className="relative">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <BillX />
        <Education />
        <Contact />
      </main>
    </SmoothScroll>
  )
}

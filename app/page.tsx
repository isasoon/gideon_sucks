import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CATEGORIES } from "@/lib/databank"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              / catalog
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Browse the archive
            </h2>
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Pick a category to dive into the dossiers. Each entry has a full
              description and reference image.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                href={`/${c.key}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_0_0_1px_oklch(0.9_0.18_95/0.25),0_20px_40px_-20px_oklch(0.9_0.18_95/0.2)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:opacity-100"
                />
                <div className="relative">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    / {c.key}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {c.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.blurb}
                  </p>
                </div>
                <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors group-hover:text-primary">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

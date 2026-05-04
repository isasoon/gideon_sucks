import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CATEGORIES } from "@/lib/databank"

const CATEGORY_TOTALS: Record<string, number> = {
  characters: 964,
  creatures: 75,
  droids: 60,
  locations: 326,
  organizations: 135,
  species: 82,
}

export function Hero() {
  const total = Object.values(CATEGORY_TOTALS).reduce((a, b) => a + b, 0)

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="starfield absolute inset-0 opacity-60" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.2_0.05_95/0.18)_0%,transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            A long time ago in a galaxy far, far away
          </p>
          <h1 className="font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            The galaxy&apos;s
            <br />
            <span className="text-primary">complete</span> databank.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Explore {total.toLocaleString()}+ entries across {CATEGORIES.length}{" "}
            categories — characters, creatures, droids, locations, organizations,
            species and vehicles. Search, browse and dive deep into the lore.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/characters"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
            >
              Start with characters
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/vehicles"
              className="rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
            >
              Browse vehicles
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.key}
                href={`/${c.key}`}
                className="rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                {c.label}
                <span className="ml-2 font-mono text-[10px] text-muted-foreground/70">
                  {CATEGORY_TOTALS[c.key]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

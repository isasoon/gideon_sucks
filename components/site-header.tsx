"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"

import { CATEGORIES } from "@/lib/databank"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Holocron home">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-md border border-primary/40 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"
          >
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Holocron
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Star Wars Databank
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {CATEGORIES.map((c) => {
            const active = pathname?.startsWith(`/${c.key}`)
            return (
              <Link
                key={c.key}
                href={`/${c.key}`}
                className={[
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {c.label}
              </Link>
            )
          })}
        </nav>

        <a
          href="https://starwars-databank.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary md:inline-flex"
        >
          API Docs
        </a>
      </div>
    </header>
  )
}

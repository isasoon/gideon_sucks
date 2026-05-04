import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { Category } from "@/lib/databank"

type Props = {
  category: Category
  page: number
  totalPages: number
  query?: string
}

function buildHref(category: Category, page: number, query?: string) {
  const params = new URLSearchParams()
  if (page > 1) params.set("page", String(page))
  if (query) params.set("q", query)
  const qs = params.toString()
  return qs ? `/${category}?${qs}` : `/${category}`
}

export function Pagination({ category, page, totalPages, query }: Props) {
  if (totalPages <= 1) return null

  const canPrev = page > 1
  const canNext = page < totalPages

  // Compact list: 1 ... p-1 p p+1 ... totalPages
  const pages: (number | "ellipsis")[] = []
  const add = (n: number | "ellipsis") => pages.push(n)

  add(1)
  if (page - 2 > 2) add("ellipsis")
  for (
    let i = Math.max(2, page - 1);
    i <= Math.min(totalPages - 1, page + 1);
    i++
  ) {
    add(i)
  }
  if (page + 2 < totalPages - 1) add("ellipsis")
  if (totalPages > 1) add(totalPages)

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-1.5 pt-8"
    >
      {canPrev ? (
        <Link
          href={buildHref(category, page - 1, query)}
          aria-label="Previous page"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/40 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/40 text-muted-foreground opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span
            key={`e-${idx}`}
            aria-hidden
            className="px-1 text-muted-foreground"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(category, p, query)}
            aria-current={p === page ? "page" : undefined}
            className={[
              "grid h-9 min-w-9 place-items-center rounded-full px-3 text-sm transition-colors",
              p === page
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            ].join(" ")}
          >
            {p}
          </Link>
        ),
      )}

      {canNext ? (
        <Link
          href={buildHref(category, page + 1, query)}
          aria-label="Next page"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/40 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span
          aria-hidden
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/40 text-muted-foreground opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  )
}

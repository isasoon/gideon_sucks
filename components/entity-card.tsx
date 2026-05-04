import Link from "next/link"
import { slugify, type Category, type Entity } from "@/lib/databank"

type Props = {
  category: Category
  entity: Entity
}

export function EntityCard({ category, entity }: Props) {
  return (
    <Link
      href={`/${category}/${slugify(entity.name)}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_0_0_1px_oklch(0.9_0.18_95/0.3),0_20px_40px_-20px_oklch(0.9_0.18_95/0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entity.image || "/placeholder.svg"}
          alt={entity.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent"
        />
        <div className="absolute left-3 top-3 rounded-full border border-border/80 bg-background/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground backdrop-blur">
          ID {entity._id.slice(-5)}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-pretty font-display text-base font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
          {entity.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {entity.description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary/80 transition-colors group-hover:text-primary">
          View dossier
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}

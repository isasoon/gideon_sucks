import Link from "next/link"
import { CATEGORIES, type Category } from "@/lib/databank"

type Props = {
  category: Category
}

export function CategoryTabs({ category }: Props) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
      {CATEGORIES.map((c) => {
        const active = c.key === category
        return (
          <Link
            key={c.key}
            href={`/${c.key}`}
            className={[
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {c.label}
          </Link>
        )
      })}
    </div>
  )
}

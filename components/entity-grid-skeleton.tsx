export function EntityGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <div className="aspect-3/4 w-full animate-pulse bg-secondary/60" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-secondary/60" />
            <div className="h-3 w-full animate-pulse rounded bg-secondary/40" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-secondary/40" />
          </div>
        </div>
      ))}
    </div>
  )
}

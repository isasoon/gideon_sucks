import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { EntityGridSkeleton } from "@/components/entity-grid-skeleton"

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <div className="mb-6 space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-secondary/60" />
            <div className="h-9 w-52 animate-pulse rounded bg-secondary/60" />
            <div className="h-3 w-80 animate-pulse rounded bg-secondary/40" />
          </div>
          <div className="mb-6 h-10 w-full animate-pulse rounded-full bg-secondary/40" />
          <EntityGridSkeleton count={20} />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

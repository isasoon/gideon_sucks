import { notFound } from "next/navigation"
import { AlertCircle } from "lucide-react"

import {
  CATEGORY_KEYS,
  fetchEntities,
  getCategoryMeta,
  type Category,
} from "@/lib/databank"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CategoryTabs } from "@/components/category-tabs"
import { SearchBar } from "@/components/search-bar"
import { EntityCard } from "@/components/entity-card"
import { Pagination } from "@/components/pagination"

const PAGE_SIZE = 20

type Props = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string; q?: string }>
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params
  const meta = getCategoryMeta(category)
  if (!meta) return { title: "Not found — Holocron" }
  return {
    title: `${meta.label} — Holocron`,
    description: meta.blurb,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  if (!CATEGORY_KEYS.includes(category as Category)) notFound()
  const meta = getCategoryMeta(category)!

  const { page: pageParam, q } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  const query = (q ?? "").trim()

  let data: Awaited<ReturnType<typeof fetchEntities>> | null = null
  let error: string | null = null
  try {
    data = await fetchEntities(category as Category, {
      page,
      limit: PAGE_SIZE,
      name: query || undefined,
    })
  } catch (e) {
    error = (e as Error).message
  }

  const total = data?.info.total ?? 0
  const totalPages = data ? Math.max(1, Math.ceil(total / PAGE_SIZE)) : 1

  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <div className="mb-6 flex flex-col gap-2">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                / {meta.key}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {data ? total.toLocaleString() : "—"} entries
                {query ? (
                  <>
                    {" "}
                    · matching{" "}
                    <span className="text-foreground">&ldquo;{query}&rdquo;</span>
                  </>
                ) : null}
              </span>
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {meta.label}
            </h1>
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              {meta.blurb}
            </p>
          </div>

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CategoryTabs category={category as Category} />
            <SearchBar
              category={category as Category}
              defaultValue={query}
              placeholder={`Search ${meta.label.toLowerCase()}...`}
            />
          </div>

          {error ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-10 text-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <p className="font-medium text-foreground">
                Transmission lost from the databank
              </p>
              <p className="max-w-md text-sm text-muted-foreground">
                We couldn&apos;t reach the API. The free Render host can take a
                moment to wake up — please refresh in a few seconds.
              </p>
            </div>
          ) : data && data.data.length === 0 ? (
            <div className="rounded-xl border border-border bg-card/40 p-10 text-center">
              <p className="font-medium text-foreground">No matches found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different name or clear your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {data?.data.map((entity) => (
                <EntityCard
                  key={entity._id}
                  category={category as Category}
                  entity={entity}
                />
              ))}
            </div>
          )}

          <Pagination
            category={category as Category}
            page={page}
            totalPages={totalPages}
            query={query}
          />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

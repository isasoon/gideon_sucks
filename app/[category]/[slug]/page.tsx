import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink } from "lucide-react"

import {
  CATEGORY_KEYS,
  fetchEntityBySlug,
  getCategoryMeta,
  type Category,
} from "@/lib/databank"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type Props = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params
  const meta = getCategoryMeta(category)
  if (!meta) return { title: "Not found — Holocron" }
  try {
    const entity = await fetchEntityBySlug(category as Category, slug)
    if (!entity) return { title: `${meta.label} — Holocron` }
    return {
      title: `${entity.name} — ${meta.label} — Holocron`,
      description: entity.description.slice(0, 160),
      openGraph: {
        title: `${entity.name} — Holocron`,
        description: entity.description.slice(0, 160),
        images: entity.image ? [{ url: entity.image }] : undefined,
      },
    }
  } catch {
    return { title: `${meta.label} — Holocron` }
  }
}

export default async function EntityPage({ params }: Props) {
  const { category, slug } = await params
  if (!CATEGORY_KEYS.includes(category as Category)) notFound()
  const meta = getCategoryMeta(category)!

  const entity = await fetchEntityBySlug(category as Category, slug)
  if (!entity) notFound()

  return (
    <>
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
          <Link
            href={`/${category}`}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to {meta.label}
          </Link>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={entity.image || "/placeholder.svg"}
                alt={entity.name}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-card/60 via-transparent to-transparent"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Link
                  href={`/${category}`}
                  className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/20"
                >
                  {meta.label}
                </Link>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  ID {entity._id}
                </span>
              </div>

              <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {entity.name}
              </h1>

              <div className="h-px w-12 bg-primary" aria-hidden />

              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {entity.description}
              </p>

              <dl className="grid grid-cols-2 gap-4 border-t border-border/60 pt-6 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Category
                  </dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {meta.label}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Source
                  </dt>
                  <dd className="mt-1 font-medium text-foreground">Databank</dd>
                </div>
              </dl>

              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  href={`/${category}`}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
                >
                  Browse more {meta.label.toLowerCase()}
                </Link>
                {entity.image && (
                  <a
                    href={entity.image}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    Open image
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}

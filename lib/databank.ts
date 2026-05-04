export const API_BASE = "https://starwars-databank-server.onrender.com/api/v1"

export type Category =
  | "characters"
  | "creatures"
  | "droids"
  | "locations"
  | "organizations"
  | "species"

export type CategoryMeta = {
  key: Category
  label: string
  blurb: string
}

export const CATEGORIES: CategoryMeta[] = [
  {
    key: "characters",
    label: "Characters",
    blurb: "Heroes, villains, scoundrels and Jedi from across the saga.",
  },
  {
    key: "creatures",
    label: "Creatures",
    blurb: "The wild beasts and exotic fauna of the galaxy.",
  },
  {
    key: "droids",
    label: "Droids",
    blurb: "Astromechs, protocol units and battle automatons.",
  },
  {
    key: "locations",
    label: "Locations",
    blurb: "Planets, cities and notable points across the galaxy.",
  },
  {
    key: "organizations",
    label: "Organizations",
    blurb: "Empires, orders, syndicates and resistance movements.",
  },
  {
    key: "species",
    label: "Species",
    blurb: "The countless intelligent species of the galaxy.",
  },
]

export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key)

export function getCategoryMeta(key: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.key === key)
}

export type Entity = {
  _id: string
  name: string
  description: string
  image: string
}

export type EntityResponse = {
  info: {
    total: number
    page: number
    limit: number
    next: string | null
    prev: string | null
  }
  data: Entity[]
}

function buildUrl(
  category: Category,
  { page, limit, name }: { page: number; limit: number; name?: string },
) {
  const params = new URLSearchParams()
  params.set("page", String(page))
  params.set("limit", String(limit))
  if (name && name.trim()) params.set("name", name.trim())
  return `${API_BASE}/${category}?${params.toString()}`
}

export async function fetchEntities(
  category: Category,
  opts: { page?: number; limit?: number; name?: string } = {},
): Promise<EntityResponse> {
  const url = buildUrl(category, {
    page: opts.page ?? 1,
    limit: opts.limit ?? 20,
    name: opts.name,
  })
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch ${category} (${res.status})`)
  }
  return res.json()
}

export async function fetchEntityBySlug(
  category: Category,
  slug: string,
): Promise<Entity | null> {
  const name = decodeURIComponent(slug).replace(/-/g, " ")
  // The API supports a `name` query param for filtering. We pull a small page
  // and find the closest match (case-insensitive).
  const res = await fetchEntities(category, { name, limit: 10 })
  if (!res.data.length) return null
  const lower = name.toLowerCase()
  const exact = res.data.find((e) => e.name.toLowerCase() === lower)
  return exact ?? res.data[0]
}

export function slugify(name: string) {
  return encodeURIComponent(
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
  )
}

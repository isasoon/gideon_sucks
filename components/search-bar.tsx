"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

import type { Category } from "@/lib/databank"

type Props = {
  category: Category
  defaultValue?: string
  placeholder?: string
}

export function SearchBar({ category, defaultValue = "", placeholder }: Props) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)
  const [isPending, startTransition] = useTransition()

  // Keep input in sync if URL changes externally (e.g. category nav)
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  // Debounced URL update as the user types
  useEffect(() => {
    if (value === defaultValue) return
    const t = setTimeout(() => {
      const params = new URLSearchParams()
      if (value.trim()) params.set("q", value.trim())
      const qs = params.toString()
      startTransition(() => {
        router.replace(qs ? `/${category}?${qs}` : `/${category}`, {
          scroll: false,
        })
      })
    }, 350)
    return () => clearTimeout(t)
  }, [value, defaultValue, category, router])

  return (
    <div className="relative w-full md:max-w-sm">
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? "Search the databank..."}
        aria-label="Search"
        className={[
          "w-full rounded-full border border-border bg-card/60 py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/60 focus:bg-card",
          isPending ? "opacity-80" : "",
        ].join(" ")}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

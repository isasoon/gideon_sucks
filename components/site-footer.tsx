export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:px-8">
        <p>
          Holocron is an unofficial fan project. Star Wars and all related
          properties are © Lucasfilm Ltd.
        </p>
        <p className="font-mono">
          Data:{" "}
          <a
            href="https://starwars-databank.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:text-primary hover:underline"
          >
            Star Wars Databank API
          </a>
        </p>
      </div>
    </footer>
  )
}

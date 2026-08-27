// Shared metric-cards block for case studies (Tegu, Docta Valley, …).
// Real numbers only — pass an optional `note` for the source/disclaimer.

const GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
}

export function CaseMetrics({
  metrics,
  note,
}: {
  metrics: { value: string; label: string }[]
  note?: string
}) {
  const grid = GRID[metrics.length] ?? "grid-cols-2 md:grid-cols-4"
  return (
    <section className="px-4 lg:px-8 max-w-[1080px] mx-auto w-full py-10">
      <div className={`grid gap-4 ${grid}`}>
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-[#3D3935]/60 bg-[#0C0A09] p-5 flex flex-col gap-1">
            <span className="font-serif text-[34px] md:text-[44px] leading-none tracking-tight text-[#FAFAF9]">
              {m.value}
            </span>
            <span className="text-body-sm text-[#A8A29E] leading-snug">{m.label}</span>
          </div>
        ))}
      </div>
      {note && <p className="font-mono text-micro text-[#57534E] mt-3">{note}</p>}
    </section>
  )
}

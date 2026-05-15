export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here — keys/values are produced by our typed builders.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

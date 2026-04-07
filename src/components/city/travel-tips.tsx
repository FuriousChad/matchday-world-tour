export function TravelTips({ content }: { content: string }) {
  return (
    <div className="rounded-xl border bg-muted/40 p-4">
      <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm">
        {content}
      </div>
    </div>
  )
}

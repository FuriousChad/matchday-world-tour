import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Itinerary } from '@/types'

export function ItinerarySection({ itineraries }: { itineraries: Itinerary[] }) {
  if (itineraries.length === 1) {
    return (
      <div className="rounded-xl border bg-card p-4">
        <h3 className="font-semibold mb-3">{itineraries[0].title}</h3>
        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm">
          {itineraries[0].content}
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue={itineraries[0].id}>
      <TabsList>
        {itineraries.map((it) => (
          <TabsTrigger key={it.id} value={it.id}>
            {it.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {itineraries.map((it) => (
        <TabsContent key={it.id} value={it.id}>
          <div className="rounded-xl border bg-card p-4">
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm">
              {it.content}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

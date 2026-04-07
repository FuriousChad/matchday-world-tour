import Image from 'next/image'
import type { Stadium } from '@/types'

export function StadiumCard({ stadium }: { stadium: Stadium }) {
  return (
    <div className="rounded-xl border overflow-hidden bg-card">
      {stadium.image_url && (
        <div className="relative h-48">
          <Image src={stadium.image_url} alt={stadium.name} fill className="object-cover" />
        </div>
      )}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold">{stadium.name}</h3>
        {stadium.capacity && (
          <p className="text-sm text-muted-foreground">
            Capacity: {stadium.capacity.toLocaleString()}
          </p>
        )}
        {stadium.description && (
          <p className="text-sm text-muted-foreground mt-2">{stadium.description}</p>
        )}
      </div>
    </div>
  )
}

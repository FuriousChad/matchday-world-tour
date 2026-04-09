import { ImageResponse } from 'next/og'
import { getCityBySlug } from '@/lib/queries'

export const alt = 'World Cup host city guide with fixtures and travel tips'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  const city = await getCityBySlug(slug)
  const cityName = city?.name ?? 'Host City'
  const state = city?.state ?? 'United States'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background:
            'linear-gradient(145deg, rgb(15, 23, 42) 0%, rgb(30, 64, 175) 50%, rgb(21, 128, 61) 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700, opacity: 0.92 }}>Matchday World Tour</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>{cityName}</div>
          <div style={{ fontSize: 38, fontWeight: 600, opacity: 0.95 }}>{state} · 2026 World Cup Guide</div>
          <div style={{ fontSize: 28, opacity: 0.9 }}>
            Stadium details · Fixtures · Matchday spots · Travel tips
          </div>
        </div>

        <div style={{ fontSize: 26, opacity: 0.85 }}>matchdayworldtour.com/cities/{slug}</div>
      </div>
    ),
    {
      ...size,
    }
  )
}

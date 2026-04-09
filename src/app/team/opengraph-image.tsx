import { ImageResponse } from 'next/og'

export const alt = 'Follow your team and plan each 2026 FIFA World Cup matchday'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
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
            'linear-gradient(145deg, rgb(17, 24, 39) 0%, rgb(4, 120, 87) 55%, rgb(22, 163, 74) 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, opacity: 0.9 }}>Matchday World Tour</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>Follow Your Team</div>
          <div style={{ fontSize: 38, fontWeight: 600, opacity: 0.95 }}>
            Full 2026 World Cup schedule + city-by-city travel guides
          </div>
        </div>

        <div style={{ fontSize: 28, opacity: 0.9 }}>matchdayworldtour.com/team</div>
      </div>
    ),
    {
      ...size,
    }
  )
}

import { ImageResponse } from 'next/og'

export const alt = 'Matchday World Tour — 2026 FIFA World Cup travel guides'
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
            'linear-gradient(135deg, rgb(6, 78, 59) 0%, rgb(15, 118, 110) 45%, rgb(2, 132, 199) 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            opacity: 0.9,
          }}
        >
          Matchday World Tour
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>
            2026 FIFA World Cup
          </div>
          <div style={{ fontSize: 42, fontWeight: 600, opacity: 0.95 }}>
            City guides, team schedules, and matchday plans.
          </div>
        </div>

        <div style={{ fontSize: 28, opacity: 0.9 }}>matchdayworldtour.com</div>
      </div>
    ),
    {
      ...size,
    }
  )
}

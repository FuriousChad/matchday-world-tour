// City timezone map — World Cup 2026 US host cities
const CITY_TIMEZONES: Record<string, string> = {
  'new-york-new-jersey': 'America/New_York',
  'boston':              'America/New_York',
  'philadelphia':        'America/New_York',
  'miami':               'America/New_York',
  'atlanta':             'America/New_York',
  'kansas-city':         'America/Chicago',
  'dallas':              'America/Chicago',
  'houston':             'America/Chicago',
  'los-angeles':         'America/Los_Angeles',
  'san-francisco':       'America/Los_Angeles',
  'seattle':             'America/Los_Angeles',
}

export function formatMatchDate(
  isoDate: string,
  citySlug: string,
  options?: { includeTime?: boolean }
): string {
  const tz = CITY_TIMEZONES[citySlug] ?? 'America/New_York'
  const date = new Date(isoDate)

  const dateStr = date.toLocaleDateString('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!options?.includeTime) return dateStr

  const timeStr = date.toLocaleTimeString('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return `${dateStr} · ${timeStr}`
}

export function isWithin48Hours(isoDate: string): boolean {
  const matchTime = new Date(isoDate).getTime()
  const now = Date.now()
  const diff = matchTime - now
  return diff > 0 && diff <= 48 * 60 * 60 * 1000
}

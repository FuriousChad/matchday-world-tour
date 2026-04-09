import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'https://matchdayworldtour.com'

function normalizeSiteUrl(rawUrl: string | undefined): string {
  if (!rawUrl) return DEFAULT_SITE_URL

  try {
    return new URL(rawUrl).toString().replace(/\/$/, '')
  } catch {
    return DEFAULT_SITE_URL
  }
}

export function getSiteUrl(): string {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl())
}

export function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString()
}

export function trimDescription(description: string, maxLength = 155): string {
  if (description.length <= maxLength) return description
  return `${description.slice(0, maxLength - 1).trimEnd()}…`
}

export function buildTwitterMetadata(
  title: string,
  description: string,
  imagePath: string,
  imageAlt: string
): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: imagePath, alt: imageAlt }],
  }
}

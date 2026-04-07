import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase storage
      {
        protocol: 'https',
        hostname: 'vcmwgpweqcbmfqoidtgn.supabase.co',
      },
      // Flag CDN (team flags)
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      // Google user avatars (OAuth)
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // Wikimedia Commons (city hero images)
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
}

export default nextConfig

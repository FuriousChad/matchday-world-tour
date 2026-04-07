import { getPosts } from '@/lib/queries'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Guides',
  description: 'Tips and guides for first-time visitors to the United States for the 2026 World Cup.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold mb-1">Travel Guides</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Everything you need to know before arriving in the United States.
      </p>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">Guides coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
            >
              {post.cover_image_url && (
                <div className="relative h-40 w-full">
                  <Image
                    src={post.cover_image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 space-y-1">
                <h2 className="font-semibold group-hover:underline">{post.title}</h2>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

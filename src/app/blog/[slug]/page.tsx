import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug } from '@/lib/queries'
import Image from 'next/image'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt ?? undefined }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="container mx-auto max-w-2xl px-4 py-8 pb-20 md:pb-8">
      {post.cover_image_url && (
        <div className="relative h-56 w-full rounded-xl overflow-hidden mb-8">
          <Image src={post.cover_image_url} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      {post.published_at && (
        <p className="text-sm text-muted-foreground mb-8">
          {new Date(post.published_at).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}
        </p>
      )}
      {/* Render plain text / markdown content — replace with a markdown renderer post-MVP */}
      <div className="prose prose-sm max-w-none whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  )
}

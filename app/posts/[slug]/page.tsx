// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPost, getPosts } from '@/lib/cosmic'
import PostContent from '@/components/PostContent'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const featuredImage = post.metadata.featured_image?.imgix_url

  return {
    title: `${post.title} | Blog Hub`,
    description: post.metadata.excerpt || `Read ${post.title} by ${post.metadata.author.title}`,
    keywords: post.metadata.categories?.map(cat => cat.title).join(', '),
    authors: [{ name: post.metadata.author.title }],
    openGraph: {
      title: post.title,
      description: post.metadata.excerpt || `Read ${post.title} by ${post.metadata.author.title}`,
      type: 'article',
      publishedTime: post.metadata.publication_date,
      authors: [post.metadata.author.title],
      images: featuredImage ? [{
        url: `${featuredImage}?w=1200&h=630&fit=crop&auto=format,compress`,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metadata.excerpt || `Read ${post.title} by ${post.metadata.author.title}`,
      images: featuredImage ? [`${featuredImage}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return <PostContent post={post} />
}
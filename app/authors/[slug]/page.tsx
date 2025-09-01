// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import AuthorProfile from '@/components/AuthorProfile'
import PostGrid from '@/components/PostGrid'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  const profileImage = author.metadata.profile_picture?.imgix_url

  return {
    title: `${author.title} | Blog Hub Authors`,
    description: author.metadata.bio || `Read articles by ${author.title}`,
    authors: [{ name: author.title }],
    openGraph: {
      title: `${author.title} - Author at Blog Hub`,
      description: author.metadata.bio || `Read articles by ${author.title}`,
      type: 'profile',
      images: profileImage ? [{
        url: `${profileImage}?w=1200&h=630&fit=crop&auto=format,compress`,
        width: 1200,
        height: 630,
        alt: author.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.title} - Author at Blog Hub`,
      description: author.metadata.bio || `Read articles by ${author.title}`,
      images: profileImage ? [`${profileImage}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthorProfile author={author} />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Articles by {author.title}
            </h2>
            <p className="text-gray-600">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
            </p>
          </div>
          
          {posts.length > 0 ? (
            <PostGrid posts={posts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles published yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
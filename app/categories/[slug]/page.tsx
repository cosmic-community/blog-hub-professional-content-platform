// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import CategoryHeader from '@/components/CategoryHeader'
import PostGrid from '@/components/PostGrid'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} | Blog Hub Categories`,
    description: category.metadata.description || `Read articles about ${category.title}`,
    openGraph: {
      title: `${category.title} - Blog Hub`,
      description: category.metadata.description || `Read articles about ${category.title}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${category.title} - Blog Hub`,
      description: category.metadata.description || `Read articles about ${category.title}`,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryHeader category={category} />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {category.title} Articles
            </h2>
            <p className="text-gray-600">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
            </p>
          </div>
          
          {posts.length > 0 ? (
            <PostGrid posts={posts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
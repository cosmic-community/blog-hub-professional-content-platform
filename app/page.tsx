import { getPosts, getFeaturedPosts, getCategories } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import FeaturedPosts from '@/components/FeaturedPosts'
import PostGrid from '@/components/PostGrid'
import CategoryFilter from '@/components/CategoryFilter'
import { Post, Category } from '@/types'

export default async function HomePage() {
  const [allPosts, featuredPosts, categories] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen">
      <HeroSection featuredPost={featuredPosts[0]} />
      
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Posts
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our most popular and insightful articles, carefully curated for you.
              </p>
            </div>
            <FeaturedPosts posts={featuredPosts} />
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Posts
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Explore our complete collection of articles across various topics and categories.
            </p>
            
            <CategoryFilter categories={categories} />
          </div>
          
          <PostGrid posts={allPosts} />
        </div>
      </section>
    </div>
  )
}
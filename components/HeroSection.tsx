import Link from 'next/link'
import { Post } from '@/types'

interface HeroSectionProps {
  featuredPost?: Post;
}

export default function HeroSection({ featuredPost }: HeroSectionProps) {
  if (!featuredPost) {
    return (
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Blog Hub
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            Discover engaging articles across technology, travel, lifestyle, and more. 
            Quality content from expert writers and thought leaders.
          </p>
        </div>
      </section>
    )
  }

  const featuredImage = featuredPost.metadata.featured_image?.imgix_url

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {featuredImage && (
        <div className="absolute inset-0">
          <img
            src={`${featuredImage}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt={featuredPost.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        </div>
      )}
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600 text-white">
              Featured Post
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {featuredPost.title}
          </h1>
          
          {featuredPost.metadata.excerpt && (
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              {featuredPost.metadata.excerpt}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-8">
            {featuredPost.metadata.author && (
              <div className="flex items-center space-x-3">
                {featuredPost.metadata.author.metadata.profile_picture && (
                  <img
                    src={`${featuredPost.metadata.author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={featuredPost.metadata.author.title}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span className="text-gray-300">
                  By {featuredPost.metadata.author.title}
                </span>
              </div>
            )}
            
            <span className="text-gray-400">
              {new Date(featuredPost.metadata.publication_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <Link
            href={`/posts/${featuredPost.slug}`}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
          >
            Read Full Article
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
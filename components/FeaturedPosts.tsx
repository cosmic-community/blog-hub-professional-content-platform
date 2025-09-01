import Link from 'next/link'
import { Post } from '@/types'

interface FeaturedPostsProps {
  posts: Post[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Show up to 3 featured posts, skip the first one if it's already in hero
  const displayPosts = posts.slice(1, 4);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayPosts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          {post.metadata.featured_image && (
            <div className="aspect-video overflow-hidden">
              <Link href={`/posts/${post.slug}`}>
                <img
                  src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>
          )}

          <div className="p-6">
            {post.metadata.categories && post.metadata.categories.length > 0 && (
              <div className="mb-3">
                <Link
                  href={`/categories/${post.metadata.categories[0].slug}`}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: post.metadata.categories[0].metadata.color + '20',
                    color: post.metadata.categories[0].metadata.color,
                  }}
                >
                  {post.metadata.categories[0].title}
                </Link>
              </div>
            )}

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              <Link
                href={`/posts/${post.slug}`}
                className="hover:text-primary-600 transition-colors duration-200"
              >
                {post.title}
              </Link>
            </h3>

            {post.metadata.excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.metadata.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              {post.metadata.author && (
                <Link
                  href={`/authors/${post.metadata.author.slug}`}
                  className="flex items-center space-x-2 hover:text-primary-600 transition-colors duration-200"
                >
                  {post.metadata.author.metadata.profile_picture && (
                    <img
                      src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.title}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{post.metadata.author.title}</span>
                </Link>
              )}

              <span>
                {new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
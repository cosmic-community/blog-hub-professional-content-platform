import Link from 'next/link'
import { Post } from '@/types'

interface FeaturedPostsProps {
  posts: Post[];
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => {
        // Add proper null/undefined checks for post properties
        if (!post || !post.metadata) {
          return null;
        }

        const { metadata } = post;
        const featuredImage = metadata.featured_image;
        const author = metadata.author;
        const categories = metadata.categories;

        return (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {featuredImage?.imgix_url && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`${featuredImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: category.metadata?.color ? `${category.metadata.color}20` : '#f3f4f6',
                        color: category.metadata?.color || '#374151',
                      }}
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                <Link href={`/posts/${post.slug}`} className="hover:text-primary-600 transition-colors duration-200">
                  {post.title}
                </Link>
              </h3>

              {metadata.excerpt && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {metadata.excerpt}
                </p>
              )}

              <div className="flex items-center justify-between">
                {author && (
                  <div className="flex items-center">
                    {author.metadata?.profile_picture?.imgix_url && (
                      <img
                        src={`${author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={author.title}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{author.title}</p>
                    </div>
                  </div>
                )}

                {metadata.publication_date && (
                  <time className="text-sm text-gray-500">
                    {new Date(metadata.publication_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
            </div>
          </article>
        );
      }).filter(Boolean)}
    </div>
  );
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Post } from '@/types'

interface PostGridProps {
  posts: Post[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const [filteredPosts, setFilteredPosts] = useState(posts)

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPosts.map((post) => (
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
              <div className="mb-3 flex flex-wrap gap-2">
                {post.metadata.categories.slice(0, 2).map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity duration-200"
                    style={{
                      backgroundColor: category.metadata.color + '20',
                      color: category.metadata.color,
                    }}
                  >
                    {category.title}
                  </Link>
                ))}
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

          {post.metadata.featured && (
            <div className="px-6 pb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ⭐ Featured
              </span>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Post } from '@/types'

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <article className="py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          {/* Categories */}
          {post.metadata.categories && post.metadata.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.metadata.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity duration-200"
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

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-8">
            {post.metadata.author && (
              <Link
                href={`/authors/${post.metadata.author.slug}`}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
              >
                {post.metadata.author.metadata.profile_picture && (
                  <img
                    src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.metadata.author.title}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </Link>
            )}

            <div className="text-gray-500">
              <p className="text-sm">Published on</p>
              <p className="font-medium">
                {new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {post.metadata.featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                ⭐ Featured Post
              </span>
            )}
          </div>

          {/* Excerpt */}
          {post.metadata.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.metadata.excerpt}
            </p>
          )}
        </div>

        {/* Featured Image */}
        {post.metadata.featured_image && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-6 text-gray-900 mt-8 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 mt-8 first:mt-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mb-3 text-gray-900 mt-6 first:mt-0">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-gray-700 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 pl-6 space-y-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 pl-6 space-y-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">
                  {children}
                </strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-6 bg-gray-50">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
                  {children}
                </pre>
              ),
            }}
          >
            {post.metadata.content}
          </ReactMarkdown>
        </div>

        {/* Author Bio Section */}
        {post.metadata.author && post.metadata.author.metadata.bio && (
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-4">
              {post.metadata.author.metadata.profile_picture && (
                <img
                  src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  About {post.metadata.author.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {post.metadata.author.metadata.bio}
                </p>
                <div className="flex space-x-4">
                  {post.metadata.author.metadata.twitter && (
                    <a
                      href={`https://twitter.com/${post.metadata.author.metadata.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      Twitter
                    </a>
                  )}
                  {post.metadata.author.metadata.linkedin && (
                    <a
                      href={post.metadata.author.metadata.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      LinkedIn
                    </a>
                  )}
                  {post.metadata.author.metadata.website && (
                    <a
                      href={post.metadata.author.metadata.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
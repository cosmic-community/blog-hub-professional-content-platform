{filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <article>
              {post.metadata.featured_image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
              )}

              <div className="p-6">
                {post.metadata.categories && post.metadata.categories.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.metadata.categories.slice(0, 2).map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: category.metadata.color + '20',
                          color: category.metadata.color,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/categories/${category.slug}`;
                        }}
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {post.title}
                </h3>

                {post.metadata.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.metadata.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                  {post.metadata.author && (
                    <div
                      className="flex items-center space-x-2"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/authors/${post.metadata.author.slug}`;
                      }}
                    >
                      {post.metadata.author.metadata.profile_picture && (
                        <img
                          src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                          alt={post.metadata.author.title}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span>{post.metadata.author.title}</span>
                    </div>
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
          </Link>
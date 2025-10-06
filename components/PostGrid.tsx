{post.metadata.categories && post.metadata.categories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {post.metadata.categories.slice(0, 2).map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity"
                          style={{
                            backgroundColor: category.metadata.color + '20',
                            color: category.metadata.color,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        {post.metadata.author && (
                          <Link
                            href={`/authors/${post.metadata.author.slug}`}
                            className="flex items-center space-x-2 hover:text-gray-700 transition-colors"
                            onClick={(e) => e.stopPropagation()}
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
                      </div>
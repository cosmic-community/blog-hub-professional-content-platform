'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          selectedCategory === null
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:text-primary-600'
        }`}
      >
        All Posts
      </button>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:text-primary-600 hover:shadow-sm"
          style={{
            '--category-color': category.metadata.color,
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            if (category.metadata.color) {
              e.currentTarget.style.borderColor = category.metadata.color;
              e.currentTarget.style.color = category.metadata.color;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.color = '#374151';
          }}
        >
          {category.title}
        </Link>
      ))}
    </div>
  )
}
import { Category } from '@/types'

interface CategoryHeaderProps {
  category: Category;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <span
            className="inline-flex items-center px-4 py-2 rounded-full text-lg font-medium"
            style={{
              backgroundColor: category.metadata.color + '20',
              color: category.metadata.color,
            }}
          >
            {category.title}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {category.title}
        </h1>

        {category.metadata.description && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category.metadata.description}
          </p>
        )}
      </div>
    </section>
  )
}
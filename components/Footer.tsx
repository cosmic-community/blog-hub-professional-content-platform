import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BH</span>
              </div>
              <span className="text-xl font-bold">Blog Hub</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A professional content platform showcasing quality articles across technology, 
              travel, lifestyle, and more. Discover engaging content from expert writers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors block">
                Home
              </Link>
              <Link href="/authors" className="text-gray-400 hover:text-white transition-colors block">
                Authors
              </Link>
              <Link href="/categories" className="text-gray-400 hover:text-white transition-colors block">
                Categories
              </Link>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Content</h3>
            <div className="space-y-2">
              <Link href="/categories/technology" className="text-gray-400 hover:text-white transition-colors block">
                Technology
              </Link>
              <Link href="/categories/travel" className="text-gray-400 hover:text-white transition-colors block">
                Travel
              </Link>
              <Link href="/categories/lifestyle" className="text-gray-400 hover:text-white transition-colors block">
                Lifestyle
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Blog Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
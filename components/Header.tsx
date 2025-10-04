'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BH</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Blog Hub</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/authors"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              Authors
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              Categories
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 px-2 py-1"
              >
                Home
              </Link>
              <Link
                href="/authors"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 px-2 py-1"
              >
                Authors
              </Link>
              <Link
                href="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 px-2 py-1"
              >
                Categories
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
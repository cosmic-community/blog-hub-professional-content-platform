import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog Hub - Professional Content Platform',
  description: 'A modern blog platform showcasing quality content across technology, travel, lifestyle, and more. Discover engaging articles from expert writers and thought leaders.',
  keywords: 'blog, articles, technology, travel, lifestyle, content platform',
  authors: [{ name: 'Blog Hub Team' }],
  openGraph: {
    title: 'Blog Hub - Professional Content Platform',
    description: 'Discover engaging articles from expert writers across technology, travel, lifestyle, and more.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Hub - Professional Content Platform',
    description: 'Discover engaging articles from expert writers across technology, travel, lifestyle, and more.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  )
}
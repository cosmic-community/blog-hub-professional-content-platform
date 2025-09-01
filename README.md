# Blog Hub - Professional Content Platform

![App Preview](https://imgix.cosmicjs.com/44c900d0-875c-11f0-8dcc-651091f6a7c0-photo-1549144511-f099e773c147-1756749080517.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, professional blog platform built with Next.js 15 and Cosmic CMS that showcases your content with style and functionality. Features advanced filtering, author profiles, and responsive design optimized for all devices.

## Features

- 📝 **Dynamic Blog Posts** - Display all your posts with rich markdown content
- 👤 **Author Profiles** - Dedicated pages for each author with bio and social links
- 🏷️ **Category Filtering** - Advanced filtering system with visual category indicators
- ⭐ **Featured Content** - Highlight important posts in dedicated sections
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🎨 **Custom Styling** - Modern design with category-specific color schemes
- 🔍 **SEO Optimized** - Proper meta tags and structured data
- ⚡ **Performance** - Built with Next.js 15 for optimal speed

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=68b5dc65ef92c548cc5ad302&clone_repository=68b5fcf88613e5560f312cd7)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **React Markdown** - Markdown content rendering
- **Bun** - Fast package manager and runtime

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog content

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching All Posts
```typescript
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Fetching a Single Post
```typescript
const post = await cosmic.objects
  .findOne({ type: 'posts', slug })
  .depth(1);
```

### Fetching Posts by Category
```typescript
const posts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': categoryId 
  })
  .depth(1);
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket's content model:

- **Posts** - Blog posts with markdown content, featured images, authors, categories, and publication dates
- **Authors** - Author profiles with bio, profile pictures, and social media links  
- **Categories** - Content categories with descriptions and custom brand colors

The application automatically pulls content from your Cosmic bucket and displays it with proper formatting, responsive images, and semantic HTML structure.

## Deployment Options

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set environment variables in Netlify dashboard
4. Deploy

Environment variables needed:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->
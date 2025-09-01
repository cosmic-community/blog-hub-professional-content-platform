// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  thumbnail?: string;
  published_at: string;
  modified_by: string;
  created_by: string;
  bucket: string;
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
    color?: string;
  };
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    bio?: string;
    profile_picture?: {
      url: string;
      imgix_url: string;
    };
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

// Post interface
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    excerpt?: string;
    author: Author;
    categories?: Category[];
    publication_date: string;
    featured: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types
export type PostWithRelations = Post & {
  metadata: Post['metadata'] & {
    author: Author;
    categories: Category[];
  };
};

export type CreatePostData = Omit<Post, 'id' | 'created_at' | 'modified_at'>;
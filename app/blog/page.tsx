'use client';

import { mockBlogPosts } from '@/lib/mock-data';
import BlogPageClient from './_BlogPageClient';

export default function BlogPage() {
  return <BlogPageClient posts={mockBlogPosts} />;
}

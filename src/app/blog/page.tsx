import { getPosts } from '@/lib/posts'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Jack Wang',
  description: 'Personal blog about software engineering, mathematics, and athletics',
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-cream">Blog</h1>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-dark-accent text-gold border border-gold/20 rounded-lg hover:bg-gold/10 transition-colors duration-300"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-dark-accent rounded-lg overflow-hidden border border-cream/10 hover:border-gold/50 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <h2 className="text-2xl font-serif text-cream hover:text-gold transition-colors duration-300 mb-3">
                  {post.title}
                </h2>
                <p className="text-cream/70 mb-4">{post.excerpt}</p>
                <div className="flex items-center">
                  <span className="text-gold/80 text-sm">{post.date}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPosts } from '@/lib/posts';

const BlogPreview = () => {
  const posts = getPosts().slice(0, 3); // Show only the latest 3 posts

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif font-bold text-cream mb-4">Blog</h2>
          <p className="text-xl text-cream/80 font-serif">My latest thoughts and experiences</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-accent rounded-lg overflow-hidden border border-cream/10 hover:border-gold/50 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <h3 className="text-2xl font-serif text-cream hover:text-gold transition-colors duration-300 mb-3">
                  {post.title}
                </h3>
                <p className="text-cream/70 mb-4">{post.excerpt}</p>
                <div className="flex items-center">
                  <span className="text-gold/80 text-sm">{post.date}</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-dark-accent text-gold border border-gold/20 rounded-lg hover:bg-gold/10 transition-colors duration-300"
          >
            View All Posts
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;

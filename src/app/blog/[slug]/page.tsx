import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/lib/posts";

/**
 * Define your route’s props shape:
 * - params will contain dynamic route segments
 * - searchParams will contain any query string (?foo=bar)
 */
interface BlogPostPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// 1) generateMetadata if you want dynamic <title>, etc.
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return { title: post.title };
}

// 2) Your actual page component
export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-gold hover:text-gold/80 transition-colors mb-8"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>

        <article className="prose prose-invert prose-gold mx-auto">
          <h1 className="text-5xl font-serif font-bold text-cream mb-4">
            {post.title}
          </h1>
          <div className="mb-8">
            <time className="text-gold/80">{post.date}</time>
          </div>
          <div className="text-cream/80">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}

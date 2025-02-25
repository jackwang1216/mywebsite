import { cache } from 'react';

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

// Mock data for development
const posts: Post[] = [
  {
    slug: 'welcome-post',
    title: 'Welcome to My Blog!',
    date: '2024-02-24',
    excerpt: 'A warm welcome to my personal blog where I share my journey in software engineering, mathematics, and athletics.',
    content: `
# Welcome to My Blog!

Hello everyone! I'm excited to start sharing my thoughts and experiences through this blog. 
Here, I'll be writing about:

- Software Engineering
- Mathematics and Research
- Athletics and Personal Growth
- My Projects and Learnings

Stay tuned for more content coming soon!
    `,
  },
];

export const getPosts = cache(() => {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getPost = cache((slug: string) => {
  return posts.find((post) => post.slug === slug) ?? null;
});

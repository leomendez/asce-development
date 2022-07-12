import React from 'react';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next/types';

type Props = {
  posts: {
    slug: string;
    frontmatter: {
      [key: string]: any;
    };
  }[];
};

export default function Blog({ posts }: Props) {
  return (
    <div className="p-10 h-full w-full">
      <h1 className="text-3xl font-bold w-full border-b-2 pb-2 dark:border-asce-font-dark border-asce-font">Blog</h1>
      <div className="flex flex-wrap pt-8">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex flex-col shadow-sm shadow-asce-primary-dark rounded-md min-w-[300px] hover:scale-105 transition-all"
          >
            <Link href={`/blog/posts/${post.slug}`}>
              <a>
                <div className="w-full h-40 border rounded-md">Image Place holder</div>
                <div className="p-4 h-24 font-semibold">{post.frontmatter?.title}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postPath = join(process.cwd(), 'src/_posts');

  const files = fs.readdirSync(postPath);
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(join(postPath, fileName), 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

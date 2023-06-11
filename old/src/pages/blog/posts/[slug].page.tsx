import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import md from 'markdown-it';
import { ParsedUrlQuery } from 'querystring';

type Props = {
  frontmatter: { [key: string]: any };
  content: string;
};

const postPath = join(process.cwd(), 'src/_posts');

export default function Posts({ frontmatter, content }: Props) {
  return (
    <div className="h-full w-full prose p-10 dark:prose-invert">
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context?.params as IParams;

  const fileName = fs.readFileSync(join(postPath, `${slug}.md`), 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(postPath);

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

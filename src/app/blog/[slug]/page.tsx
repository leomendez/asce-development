import React from 'react';
import fs from 'fs';
import { join } from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { H2, P } from '@/components/MDX';

const postPath = join(process.cwd(), 'src/_posts');
export default async function Page({
  params,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const source = fs.readFileSync(join(postPath, `${params.slug}.mdx`));

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source,
    options: { parseFrontmatter: true },
    components: {
      h2: H2,
      p: P
    }
  });

  return (
    <div className="p-8 md:p-36 flex flex-col h-full items-start overflow-hidden gap-4">
      <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
      {content}
    </div>
  );
}

import fs from "fs";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { BlogCard } from "@/components/BlogCard";

type Frontmatter = {
  title: string;
  metaDesc: string;
  date: string;
  tags: string[];
};

const postPath = join(process.cwd(), "src/_posts");

async function getPosts() {
  const files = fs.readdirSync(postPath).filter((file) => file.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = fs.readFileSync(join(postPath, file));
      const { frontmatter } = await compileMDX<Frontmatter>({
        source,
        options: { parseFrontmatter: true },
      });

      const imageSrc = ["svg", "jpg", "png"]
        .map((ext) => `/blog/${slug}/${slug}.${ext}`)
        .find((path) => fs.existsSync(join(process.cwd(), "public", path)));

      return { slug, frontmatter, imageSrc };
    }),
  );

  return posts.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className="pb-5">
      <div className="p-8 md:p-36 flex flex-col items-start">
        <h1 className="text-4xl font-bold">Blog</h1>
        <div className="mt-20 flex flex-col gap-4 w-full">
          {posts.map(({ slug, frontmatter, imageSrc }) => (
            <BlogCard
              key={slug}
              href={`/blog/${slug}`}
              title={frontmatter.title}
              content={frontmatter.metaDesc}
              imageSrc={imageSrc}
              tags={frontmatter.tags ?? []}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

import { cache } from "react";
import type { ComponentType } from "react";

import { listContentFiles } from "@/lib/content/base";
import { blogFrontmatterSchema } from "@/lib/validators/content";
import type { BlogPost, BlogPostMeta } from "@/types/content";

type BlogModule = {
  default: ComponentType;
  frontmatter: unknown;
};

async function loadBlogModule(slug: string): Promise<BlogModule> {
  return import(`@/content/blog/${slug}.mdx`) as Promise<BlogModule>;
}

async function getPostMetaFromSlug(slug: string): Promise<BlogPostMeta> {
  const module = await loadBlogModule(slug);
  const frontmatter = module.frontmatter as Record<string, unknown>;

  return blogFrontmatterSchema.parse({
    slug,
    ...frontmatter,
  });
}

export const getAllBlogPosts = cache(async (): Promise<BlogPostMeta[]> => {
  const files = await listContentFiles(["blog"], ".mdx");
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getPostMetaFromSlug(slug);
    }),
  );

  return posts.sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() -
      new Date(left.publishedAt).getTime(),
  );
});

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts();
  const meta = posts.find((post) => post.slug === slug);

  if (!meta) {
    return undefined;
  }

  const module = await loadBlogModule(slug);

  return {
    ...meta,
    Content: module.default,
  };
}

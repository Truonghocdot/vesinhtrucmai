import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPageContent } from "@/lib/content/pages";
import { getAllBlogPosts } from "@/lib/content/blog";
import { getBlogPath } from "@/lib/routes/site";
import { formatDateVi } from "@/lib/utils/format";
import { getSiteUrl } from "@/lib/utils/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBlogPageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/blog",
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Blog Vệ Sinh Trúc Mai" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function BlogPage() {
  const content = await getBlogPageContent();
  const posts = await getAllBlogPosts();
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Vệ Sinh Trúc Mai",
    "url": `${siteUrl}/blog`,
    "description": content.seo.description,
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.publishedAt,
      "url": `${siteUrl}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-orange-100 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_35%),linear-gradient(135deg,_#fff7ed_0%,_#ffffff_60%,_#fffbeb_100%)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <span className="inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-orange-700 uppercase backdrop-blur">
            {content.hero.eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
            {content.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Featured Topic Banner */}
      <section className="mx-auto max-w-7xl px-6 pt-12 md:px-8 lg:px-12">
        <div className="rounded-[2rem] border border-orange-100 bg-orange-50/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider text-orange-600 uppercase">Chủ đề tiêu điểm</span>
            <p className="mt-2 text-base md:text-lg font-bold text-slate-950">
              {content.featuredTopic}
            </p>
          </div>
          <Link
            href="/booking"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Nhận tư vấn khảo sát
          </Link>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-[2.5rem] border border-slate-200 bg-white overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,0.03)] hover:border-orange-200 transition"
            >
              {/* Cover Image Placeholder with Elegant Gradient */}
              <div className="relative aspect-video w-full bg-gradient-to-br from-orange-100 to-amber-100/30 overflow-hidden flex items-center justify-center p-8 text-center border-b border-slate-100">
                <span className="font-heading text-xl font-bold tracking-tight text-orange-700/80 group-hover:scale-105 transition duration-500 select-none">
                  {post.title}
                </span>
                <div className="absolute top-4 right-4 rounded-full bg-white/80 border border-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 backdrop-blur">
                  {post.readingTime}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span>{formatDateVi(post.publishedAt)}</span>
                </div>
                
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 group-hover:text-orange-600 transition">
                  <Link href={getBlogPath(post.slug)}>{post.title}</Link>
                </h2>
                
                <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={getBlogPath(post.slug)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition group-hover:text-orange-700"
                  >
                    Đọc tiếp
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/content/blog";
import { getBlogPath } from "@/lib/routes/site";
import { formatDateVi } from "@/lib/utils/format";
import { getSiteUrl } from "@/lib/utils/site-url";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const path = `/blog/${slug}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: path,
      siteName: "Vệ Sinh Trúc Mai",
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: ["/images/og-image.png"],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const siteUrl = getSiteUrl();

  if (!post) {
    notFound();
  }

  const { Content } = post;

  // Get related posts (exclude current post, max 2)
  const allPosts = await getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Vệ Sinh Trúc Mai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Vệ Sinh Trúc Mai",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/og-image.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="flex-1">
      {/* Blog Header */}
      <section className="relative overflow-hidden border-b border-orange-100 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.14),_transparent_35%),linear-gradient(135deg,_#fff7ed_0%,_#ffffff_60%,_#fffbeb_100%)] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="flex items-center gap-3 text-sm font-semibold text-orange-700 uppercase tracking-wider">
            <span>Cẩm nang vệ sinh</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 font-medium">
            {post.excerpt}
          </p>
          <div className="mt-8 flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span>Ngày đăng: {formatDateVi(post.publishedAt)}</span>
          </div>
        </div>
      </section>

      {/* Blog Body Content */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        <article className="prose max-w-none">
          <Content />
        </article>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-10">
              Bài viết liên quan
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedPosts.map((p) => (
                <article
                  key={p.slug}
                  className="group flex flex-col rounded-[2.5rem] border border-slate-200 bg-white overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,0.03)] hover:border-orange-200 transition"
                >
                  <div className="relative aspect-video w-full bg-gradient-to-br from-orange-100 to-amber-100/30 overflow-hidden flex items-center justify-center p-8 text-center border-b border-slate-100">
                    <span className="font-heading text-lg font-bold tracking-tight text-orange-700/80 select-none">
                      {p.title}
                    </span>
                    <div className="absolute top-4 right-4 rounded-full bg-white/80 border border-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 backdrop-blur">
                      {p.readingTime}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-semibold">{formatDateVi(p.publishedAt)}</p>
                      <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950 group-hover:text-orange-600 transition">
                        <Link href={getBlogPath(p.slug)}>{p.title}</Link>
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {p.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Link
                        href={getBlogPath(p.slug)}
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
          </div>
        </section>
      )}
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getAboutPageContent } from "@/lib/content/pages";
import { getSiteUrl } from "@/lib/utils/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: "/gioi-thieu",
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/gioi-thieu",
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Giới thiệu Vệ Sinh Trúc Mai" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function AboutPage() {
  const content = await getAboutPageContent();
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Giới thiệu Vệ Sinh Trúc Mai",
    "url": `${siteUrl}/gioi-thieu`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Vệ Sinh Trúc Mai",
      "url": siteUrl,
      "description": content.seo.description,
    },
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
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={content.hero.primaryCta.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              {content.hero.primaryCta.label}
            </Link>
            {content.hero.secondaryCta && (
              <Link
                href={content.hero.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-700"
              >
                {content.hero.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
              Câu chuyện của chúng tôi
            </h2>
            <div className="mt-6 h-1 w-20 rounded bg-orange-500" />
          </div>
          <div className="space-y-6 text-slate-700 lg:col-span-7">
            {content.storyParagraphs.map((para, index) => (
              <p key={index} className="text-base leading-8 md:text-lg">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold tracking-[0.16em] text-orange-600 uppercase">
              Cam kết dịch vụ
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
              Những nguyên tắc chúng tôi không đánh đổi
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.commitments.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_24px_60px_rgba(249,115,22,0.1)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-black text-orange-700">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

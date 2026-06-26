import type { Metadata } from "next";
import Link from "next/link";
import { getHomePageContent } from "@/lib/content/pages";
import { getAllServices } from "@/lib/content/services";
import { getServicePath } from "@/lib/routes/site";
import { getSiteUrl } from "@/lib/utils/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getHomePageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/",
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Vệ Sinh Trúc Mai",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function Home() {
  const content = await getHomePageContent();
  const allServices = await getAllServices();
  const siteUrl = getSiteUrl();

  // Filter services by the slugs featured on the homepage
  const featuredServices = allServices.filter((s) =>
    content.featuredServiceSlugs.includes(s.slug)
  );

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vệ Sinh Trúc Mai",
    "url": siteUrl,
    "description": content.seo.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/booking?search={search_term_string}`,
      "query-input": "required name=search_term_string"
        }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-orange-100 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.24),_transparent_28%),linear-gradient(135deg,_#fff7ed_0%,_#ffffff_52%,_#fffbeb_100%)]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-6 py-16 md:px-8 md:py-24 lg:flex-row lg:items-end lg:justify-between lg:px-12">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-orange-700 uppercase backdrop-blur">
                {content.hero.eyebrow}
              </span>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-6xl">
                {content.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">
                {content.hero.description}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={content.hero.primaryCta.href}
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-orange-500 px-7 text-base font-semibold text-white shadow-[0_16px_40px_rgba(249,115,22,0.28)] transition hover:bg-orange-600"
                >
                  {content.hero.primaryCta.label}
                </Link>
                {content.hero.secondaryCta && (
                  <Link
                    href={content.hero.secondaryCta.href}
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-base font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-700"
                  >
                    {content.hero.secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>

            <div className="grid w-full max-w-xl gap-4 sm:grid-cols-3 lg:max-w-md lg:grid-cols-1">
              {content.hero.metrics?.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="text-3xl font-black text-orange-600">
                    {metric.value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="mx-auto w-full max-w-7xl px-6 py-8 md:px-8 lg:px-12">
          <div className="flex flex-wrap gap-4 items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Cam kết:</span>
            {content.trustStrip.map((trustItem) => (
              <span
                key={trustItem}
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-150 px-4 py-2 text-xs font-semibold text-slate-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {trustItem}
              </span>
            ))}
          </div>
        </section>

        {/* Reasons Section */}
        <section className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-20 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-[0.16em] text-orange-600 uppercase">
              Giá trị khác biệt
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
              {content.reasonsTitle}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {content.reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="group rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.03)] hover:border-orange-200 transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-black text-orange-700">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-slate-950">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8 md:py-20 lg:px-12 border-t border-slate-100 bg-slate-50/50">
          <div className="flex flex-col gap-5 md:max-w-3xl mb-12">
            <span className="text-sm font-semibold tracking-[0.16em] text-orange-600 uppercase">
              Nhóm dịch vụ nổi bật
            </span>
            <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-5xl">
              Gói dịch vụ chuyên sâu và định kỳ
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredServices.map((service, index) => (
              <article
                key={service.slug}
                className="group flex flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_24px_70px_rgba(249,115,22,0.16)]"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-bold text-orange-700">
                    0{index + 1}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-slate-950">
                    {service.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {service.excerpt}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    href={getServicePath(service.slug)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition group-hover:text-orange-700"
                  >
                    Xem chi tiết và bảng giá
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-16 md:px-8 lg:px-12">
          <div className="rounded-[2.5rem] bg-slate-950 px-8 py-10 text-white md:px-12 md:py-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="text-sm font-semibold tracking-[0.18em] text-orange-300 uppercase">
                  {content.cta.eyebrow}
                </span>
                <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] md:text-4xl">
                  {content.cta.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
                  {content.cta.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href={content.cta.primaryCta.href}
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-orange-500 px-7 text-base font-semibold text-white transition hover:bg-orange-400"
                >
                  {content.cta.primaryCta.label}
                </Link>
                {content.cta.secondaryCta && (
                  <Link
                    href={content.cta.secondaryCta.href}
                    className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-700 px-7 text-base font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
                  >
                    {content.cta.secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

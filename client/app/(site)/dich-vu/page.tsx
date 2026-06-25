import type { Metadata } from "next";
import Link from "next/link";
import { getServicesPageContent } from "@/lib/content/pages";
import { getAllServices } from "@/lib/content/services";
import { getServicePath } from "@/lib/routes/site";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getServicesPageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: "/dich-vu",
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/dich-vu",
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Dịch vụ Vệ Sinh Trúc Mai" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function ServicesPage() {
  const content = await getServicesPageContent();
  const services = await getAllServices();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Dịch vụ vệ sinh tại Trúc Mai",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.excerpt,
        "url": `https://vesinhtrucmai.vn/dich-vu/${service.slug}`,
      },
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

      {/* Services List Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className="group flex flex-col rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_24px_60px_rgba(249,115,22,0.12)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-black text-orange-700">
                0{index + 1}
              </div>
              <h2 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-slate-950">
                {service.name}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {service.excerpt}
              </p>
              
              <div className="mt-6 h-px bg-slate-100" />
              
              {/* Service Highlights */}
              <ul className="mt-6 flex-1 space-y-3">
                {service.cardHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4">
                <Link
                  href={getServicePath(service.slug)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition group-hover:text-orange-700"
                >
                  Xem chi tiết dịch vụ
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}

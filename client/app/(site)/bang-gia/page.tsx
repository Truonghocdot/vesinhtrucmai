import type { Metadata } from "next";
import Link from "next/link";
import { getPricingPageContent } from "@/lib/content/pages";
import { getPricingPackages } from "@/lib/content/pricing";
import { getAllServices } from "@/lib/content/services";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPricingPageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: "/bang-gia",
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/bang-gia",
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Bảng giá Vệ Sinh Trúc Mai" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function PricingPage() {
  const content = await getPricingPageContent();
  const allPackages = await getPricingPackages();
  const allServices = await getAllServices();

  return (
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

      {/* Pricing Packages Grouped by Service */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12 space-y-20">
        {allServices.map((service) => {
          const servicePackages = allPackages.filter((pkg) =>
            pkg.appliesTo.includes(service.slug)
          );

          if (servicePackages.length === 0) return null;

          return (
            <div key={service.slug} className="space-y-8">
              {/* Service Category Header */}
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-semibold tracking-wider text-orange-600 uppercase">
                  Danh mục dịch vụ
                </span>
                <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl mt-1">
                  Bảng giá {service.name}
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  {service.excerpt}
                </p>
              </div>

              {/* Service Packages Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {servicePackages.map((pkg) => (
                  <div
                    key={pkg.code}
                    className="flex flex-col rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.03)] hover:border-orange-200 transition"
                  >
                    <h3 className="text-xl font-bold tracking-tight text-slate-950">
                      {pkg.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {pkg.summary}
                    </p>

                    <div className="mt-6 h-px bg-slate-100" />

                    {/* Pricing items */}
                    <ul className="mt-6 space-y-4 flex-1">
                      {pkg.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-sm font-medium text-slate-800">{item.label}</span>
                            {item.note && (
                              <p className="text-xs text-slate-500 mt-0.5">{item.note}</p>
                            )}
                          </div>
                          <span className="text-sm font-bold text-orange-600 whitespace-nowrap">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 h-px bg-slate-100" />

                    {/* Notes */}
                    <div className="mt-6 space-y-1.5">
                      {pkg.notes.map((note, idx) => (
                        <p key={idx} className="text-xs text-slate-500 leading-relaxed flex gap-2">
                          <span className="text-orange-500 shrink-0">•</span>
                          {note}
                        </p>
                      ))}
                    </div>

                    <div className="mt-8 flex gap-3">
                      <Link
                        href={`/booking?service=${service.slug}`}
                        className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-orange-500 px-4 text-xs font-semibold text-white transition hover:bg-orange-600"
                      >
                        Đặt lịch ngay
                      </Link>
                      <Link
                        href={`/dich-vu/${service.slug}`}
                        className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 transition hover:border-orange-300"
                      >
                        Chi tiết dịch vụ
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

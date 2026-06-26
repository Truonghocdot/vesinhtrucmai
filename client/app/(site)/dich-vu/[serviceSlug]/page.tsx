import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServices } from "@/lib/content/services";
import { getPricingPackagesForService } from "@/lib/content/pricing";
import { getAllLocations } from "@/lib/content/locations";
import { getServiceLocationPath } from "@/lib/routes/site";
import { getSiteUrl } from "@/lib/utils/site-url";

type Props = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);
  if (!service) return {};

  const path = `/dich-vu/${serviceSlug}`;

  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: path,
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.title,
      description: service.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

// Generate static params for prerendering
export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    serviceSlug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);
  const siteUrl = getSiteUrl();

  if (!service) {
    notFound();
  }

  const packages = await getPricingPackagesForService(serviceSlug);
  const allLocations = await getAllLocations();
  const coveredLocations = allLocations.filter((loc) =>
    service.coverageRefs.includes(loc.slug)
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.excerpt,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Vệ Sinh Trúc Mai",
      "url": siteUrl
    },
    "areaServed": coveredLocations.map((loc) => ({
      "@type": "AdministrativeArea",
      "name": loc.name,
    })),
    "offers": packages.map((pkg) => ({
      "@type": "Offer",
      "name": pkg.name,
      "description": pkg.summary,
    })),
  };

  const faqSchema = service.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-orange-100 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_35%),linear-gradient(135deg,_#fff7ed_0%,_#ffffff_60%,_#fffbeb_100%)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <span className="inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-orange-700 uppercase backdrop-blur">
            {service.hero.eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
            {service.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
            {service.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {service.hero.highlights.map((highlight, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                {highlight}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600"
            >
              Đặt lịch khảo sát
            </Link>
            <Link
              href="#pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-700"
            >
              Xem bảng giá
            </Link>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-20 lg:px-12 text-center">
        <h2 className="text-sm font-semibold tracking-[0.18em] text-orange-600 uppercase">
          Giới thiệu dịch vụ
        </h2>
        <p className="mt-6 text-xl leading-10 text-slate-800 md:text-2xl font-medium tracking-tight">
          "{service.summary}"
        </p>
      </section>

      {/* Benefits Section */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.16em] text-orange-600 uppercase">
              Giá trị cốt lõi
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
              Vì sao nên chọn gói {service.name} tại Trúc Mai?
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_24px_60px_rgba(249,115,22,0.1)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-black text-orange-700">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-slate-950">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-[0.16em] text-orange-600 uppercase">
            Bảng giá đề xuất
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            Các gói dịch vụ {service.name}
          </h2>
          <p className="mt-4 text-slate-600">
            Chọn gói phù hợp và gửi nhu cầu cho chúng tôi để nhận báo giá chi tiết cho mặt bằng của bạn.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 justify-center max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.code}
              className="flex flex-col rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.04)]"
            >
              <h3 className="text-2xl font-bold tracking-[-0.02em] text-slate-950">
                {pkg.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {pkg.summary}
              </p>

              <div className="mt-6 h-px bg-slate-100" />

              {/* Items */}
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
              <div className="mt-6 space-y-2">
                {pkg.notes.map((note, idx) => (
                  <p key={idx} className="text-xs text-slate-500 leading-5 flex gap-2">
                    <span className="text-orange-500 shrink-0">•</span>
                    {note}
                  </p>
                ))}
              </div>

              <Link
                href={`/booking?service=${serviceSlug}`}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Đặt gói này
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Section */}
      {coveredLocations.length > 0 && (
        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center md:px-8 lg:px-12">
            <h2 className="font-heading text-2xl font-bold tracking-[-0.03em] md:text-3xl">
              Khu vực hỗ trợ gói {service.name}
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Trực tiếp triển khai đội ngũ và thiết bị tại các khu vực hành chính:
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {coveredLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={getServiceLocationPath(serviceSlug, loc.slug)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-6 text-sm font-semibold text-white transition hover:border-orange-500 hover:text-orange-400"
                >
                  {service.name} tại {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-[0.16em] text-orange-600 uppercase">
            Giải đáp thắc mắc
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            Câu hỏi thường gặp về {service.name}
          </h2>
        </div>

        <div className="space-y-4">
          {service.faq.map((faq, index) => (
            <details
              key={index}
              className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900">
                <h3 className="font-heading text-lg font-bold tracking-[-0.01em]">
                  {faq.question}
                </h3>
                <span className="relative h-5 w-5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="absolute inset-0 h-5 w-5 opacity-100 transition duration-300 group-open:opacity-0 text-orange-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="absolute inset-0 h-5 w-5 opacity-0 transition duration-300 group-open:opacity-100 text-orange-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-600 border-t border-slate-100 pt-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationBySlug, getAllLocations } from "@/lib/content/locations";
import { getAllServices } from "@/lib/content/services";
import { getServiceLocationPath } from "@/lib/routes/site";

type Props = {
  params: Promise<{ locationSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);
  if (!location) return {};

  const path = `/khu-vuc/${locationSlug}`;

  return {
    title: location.seo.title,
    description: location.seo.description,
    keywords: location.seo.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: location.seo.title,
      description: location.seo.description,
      url: path,
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: `Vệ Sinh Trúc Mai tại ${location.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: location.seo.title,
      description: location.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

// Generate static params for locations
export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((loc) => ({
    locationSlug: loc.slug,
  }));
}

export default async function LocationDetailPage({ params }: Props) {
  const { locationSlug } = await params;
  const location = await getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const allServices = await getAllServices();

  // Filter services that cover this location
  const coveredServices = allServices.filter((service) =>
    service.coverageRefs.includes(locationSlug)
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Vệ Sinh Trúc Mai tại ${location.name}`,
    "url": `https://vesinhtrucmai.vn/khu-vuc/${locationSlug}`,
    "description": location.seo.description,
    "about": {
      "@type": "AdministrativeArea",
      "name": location.name,
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
            Khu vực phục vụ
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
            Vệ Sinh Trúc Mai tại {location.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
            {location.intro}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/booking?location=${locationSlug}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600"
            >
              Đặt lịch khảo sát tại {location.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Services in this Location */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="max-w-3xl mb-12">
          <span className="text-sm font-semibold tracking-[0.16em] text-orange-600 uppercase">
            Dịch vụ của chúng tôi
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
            Các gói vệ sinh phục vụ tại {location.name}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coveredServices.map((service, index) => {
            const localHighlight = location.serviceHighlights.find(
              (h) => h.serviceSlug === service.slug
            );
            return (
              <article
                key={service.slug}
                className="group flex flex-col rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_16px_40px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_24px_60px_rgba(249,115,22,0.12)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-black text-orange-700">
                  0{index + 1}
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-[-0.03em] text-slate-950">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {service.excerpt}
                </p>
                <div className="mt-4 rounded-2xl bg-orange-50/50 p-4 border border-orange-100/50">
                  <p className="text-xs font-semibold text-orange-800 uppercase tracking-wider">
                    Giải pháp tại {location.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    {localHighlight?.blurb || service.hero.description}
                  </p>
                </div>
                <div className="mt-auto pt-6">
                  <Link
                    href={getServiceLocationPath(service.slug, locationSlug)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition group-hover:text-orange-700"
                  >
                    Xem chi tiết và bảng giá
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4 transition group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Coverage & Focus Section */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Districts list */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-slate-950 mb-6">
                Các quận / huyện hỗ trợ nhanh
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Đội ngũ của Trúc Mai có thể di chuyển nhanh và chuẩn bị đầy đủ máy móc cho các ca làm việc tại:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {location.districts.map((district) => (
                  <span
                    key={district}
                    className="inline-flex rounded-full bg-slate-50 border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-800"
                  >
                    {district}
                  </span>
                ))}
              </div>
            </div>

            {/* Focus Areas list */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-slate-950 mb-6">
                Nhu cầu vệ sinh trọng tâm ở {location.name}
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Các phân khúc khách hàng mà Trúc Mai đã và đang xây dựng quy trình phục vụ chuyên sâu:
              </p>
              <ul className="space-y-4">
                {location.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-700 leading-6">{area}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
      </main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServices } from "@/lib/content/services";
import { getLocationBySlug, getAllLocations } from "@/lib/content/locations";
import { getPricingPackagesForService } from "@/lib/content/pricing";
import { getSiteUrl } from "@/lib/utils/site-url";

type Props = {
  params: Promise<{ serviceSlug: string; locationSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, locationSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);
  const location = await getLocationBySlug(locationSlug);
  if (!service || !location) return {};

  const path = `/dich-vu/${serviceSlug}/${locationSlug}`;
  const title = `${service.name} tại ${location.name} | Vệ Sinh Trúc Mai`;
  const description = `Dịch vụ ${service.name.toLowerCase()} uy tín, chuyên nghiệp tại ${location.name}. ${service.excerpt}`;

  return {
    title,
    description,
    keywords: [
      `ve sinh ${location.slug}`,
      `${service.slug} ${location.slug}`,
      `dich vu ve sinh ${location.slug}`,
      `vệ sinh trúc mai ${location.name.toLowerCase()}`
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.png"],
    },
  };
}

// Generate static params for prerendering combinations
export async function generateStaticParams() {
  const services = await getAllServices();
  const locations = await getAllLocations();
  const params: { serviceSlug: string; locationSlug: string }[] = [];

  for (const service of services) {
    for (const location of locations) {
      if (service.coverageRefs.includes(location.slug)) {
        params.push({
          serviceSlug: service.slug,
          locationSlug: location.slug,
        });
      }
    }
  }

  return params;
}

export default async function ServiceLocationPage({ params }: Props) {
  const { serviceSlug, locationSlug } = await params;
  const service = await getServiceBySlug(serviceSlug);
  const location = await getLocationBySlug(locationSlug);
  const siteUrl = getSiteUrl();

  if (!service || !location || !service.coverageRefs.includes(locationSlug)) {
    notFound();
  }

  const packages = await getPricingPackagesForService(serviceSlug);
  const highlight = location.serviceHighlights.find(
    (h) => h.serviceSlug === serviceSlug
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} tại ${location.name}`,
    "description": highlight?.blurb || service.excerpt,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Vệ Sinh Trúc Mai",
      "url": siteUrl
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": location.name
    },
    "offers": packages.map((pkg) => ({
      "@type": "Offer",
      "name": pkg.name,
      "description": pkg.summary
    }))
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
            {service.name} • {location.name}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
            {service.hero.title.replace(/\.?$/, "")} tại {location.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl">
            {highlight?.blurb || service.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/booking?service=${serviceSlug}&location=${locationSlug}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600"
            >
              Đặt lịch tại {location.name}
            </Link>
            <Link
              href={`/dich-vu/${serviceSlug}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 transition hover:border-orange-300 hover:text-orange-700"
            >
              Chi tiết gói dịch vụ
            </Link>
          </div>
        </div>
      </section>

      {/* Intro & Area Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-black tracking-[-0.03em] text-slate-950 md:text-4xl">
              Phạm vi hoạt động tại {location.name}
            </h2>
            <p className="text-base leading-7 text-slate-600">
              {location.intro}
            </p>
            
            <div className="rounded-[2rem] border border-orange-100 bg-orange-50/40 p-6">
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-4">Các khu vực trọng điểm</h3>
              <div className="flex flex-wrap gap-2">
                {location.districts.map((district) => (
                  <span
                    key={district}
                    className="inline-flex rounded-full bg-white border border-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-800"
                  >
                    {district}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {/* Focus Areas */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8">
              <h3 className="font-heading text-xl font-bold tracking-[-0.02em] text-slate-950 mb-6">
                Nhóm đối tượng phục vụ chính tại {location.name}
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {location.focusAreas.map((area, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Section */}
            <div>
              <h3 className="font-heading text-xl font-bold tracking-[-0.02em] text-slate-950 mb-6">
                Bảng giá gói tham khảo
              </h3>
              <div className="grid gap-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.code}
                    className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h4 className="text-lg font-bold text-slate-950">{pkg.name}</h4>
                      <span className="text-xs text-slate-500">{pkg.summary}</span>
                    </div>
                    <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                      {pkg.items.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm">
                          <span className="text-slate-600">{item.label}</span>
                          <span className="font-bold text-orange-600">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

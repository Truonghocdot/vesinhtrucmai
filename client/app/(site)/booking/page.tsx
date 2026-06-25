import type { Metadata } from "next";
import Link from "next/link";
import { getBookingPageContent } from "@/lib/content/pages";
import { getAllServices } from "@/lib/content/services";
import { getAllLocations } from "@/lib/content/locations";
import BookingForm from "./booking-form";

type Props = {
  searchParams: Promise<{ service?: string; location?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBookingPageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: "/booking",
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/booking",
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Đặt lịch Vệ Sinh Trúc Mai" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function BookingPage({ searchParams }: Props) {
  const content = await getBookingPageContent();
  const allServices = await getAllServices();
  const allLocations = await getAllLocations();

  const { service, location } = await searchParams;

  const servicesList = allServices.map((s) => ({ slug: s.slug, name: s.name }));
  const locationsList = allLocations.map((l) => ({ slug: l.slug, name: l.name }));

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
        </div>
      </section>

      {/* Booking Layout */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Intro Points & Sidebar */}
          <div className="space-y-10 lg:col-span-5">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                Tại sao chọn Trúc Mai?
              </h2>
              <ul className="space-y-4">
                {content.introPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm leading-6 text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2.5rem] border border-orange-100 bg-orange-50/45 p-8 space-y-6">
              <h3 className="font-heading text-lg font-bold text-slate-950">
                {content.sidebarTitle}
              </h3>
              <ol className="space-y-4">
                {content.sidebarPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xs font-black text-white">
                      {idx + 1}
                    </div>
                    <span className="text-sm leading-6 text-slate-700">{point}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <BookingForm
              services={servicesList}
              locations={locationsList}
              fieldLabels={content.fieldLabels}
              ctaCopy={content.ctaCopy}
              defaultService={service}
              defaultLocation={location}
            />
          </div>
          
        </div>
      </section>
    </main>
  );
}

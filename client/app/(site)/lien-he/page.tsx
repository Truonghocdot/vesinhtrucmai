import type { Metadata } from "next";
import Link from "next/link";
import { getContactPageContent } from "@/lib/content/pages";
import { getSiteConfig } from "@/lib/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactPageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: "/lien-he",
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/lien-he",
      siteName: "Vệ Sinh Trúc Mai",
      type: "website",
      images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Liên hệ Vệ Sinh Trúc Mai" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function ContactPage() {
  const content = await getContactPageContent();
  const siteConfig = await getSiteConfig();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Liên hệ Vệ Sinh Trúc Mai",
    "url": "https://vesinhtrucmai.vn/lien-he",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": siteConfig.brandName,
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address,
        "addressCountry": "VN"
      }
    }
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
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Left Column: Contact Cards */}
          <div className="space-y-6 lg:col-span-7">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950 md:text-3xl">
              Thông tin liên hệ trực tiếp
            </h2>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Phone Card */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.28-5.116-3.573-6.42-6.42l1.293-.97a1.125 1.125 0 0 0 .417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-950">Điện thoại / Zalo</h3>
                <p className="mt-1 text-2xl font-black text-orange-600 tracking-tight">{siteConfig.phoneDisplay}</p>
                <p className="mt-2 text-sm text-slate-500">Gọi hoặc nhắn tin tư vấn trực tiếp 24/7</p>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-950">Email liên hệ</h3>
                <p className="mt-1 text-lg font-bold text-slate-900 break-all">{siteConfig.email}</p>
                <p className="mt-2 text-sm text-slate-500">Phản hồi hồ sơ, thầu hoặc yêu cầu báo giá doanh nghiệp</p>
              </a>

              {/* Hours Card */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-950">Giờ làm việc</h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  {siteConfig.businessHours.map((hours, index) => (
                    <li key={index}>{hours}</li>
                  ))}
                </ul>
              </div>

              {/* Social Channels Card */}
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935 2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-slate-950">Kênh kết nối</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {siteConfig.socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-orange-100 hover:text-orange-700"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Promises & CTA */}
          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-[2.5rem] border border-orange-100 bg-orange-50/50 p-8">
              <h3 className="font-heading text-xl font-bold tracking-[-0.02em] text-slate-950">
                Cam kết phản hồi
              </h3>
              <ul className="mt-6 space-y-4">
                {content.responsePromises.map((promise, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm leading-6 text-slate-700">{promise}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white">
              <h3 className="font-heading text-xl font-bold tracking-[-0.02em]">
                Đặt lịch khảo sát nhanh?
              </h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Bạn có thể gửi trước thông tin cơ bản về diện tích, địa chỉ và nhu cầu vệ sinh để chúng tôi tính toán phương án sơ bộ.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={content.hero.primaryCta.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  {content.hero.primaryCta.label}
                </Link>
                {content.hero.secondaryCta && (
                  <Link
                    href={content.hero.secondaryCta.href}
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-700 px-5 text-sm font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
                  >
                    {content.hero.secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </section>
      </main>
    </>
  );
}

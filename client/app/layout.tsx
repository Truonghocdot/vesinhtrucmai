import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { GoogleAnalytics } from "@/components/common/analytics/google-analytics";
import { getSiteConfig } from "@/lib/content/site";
import { getSiteUrl } from "@/lib/utils/site-url";

import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: "variable",
});

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: "variable",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Vệ Sinh Trúc Mai | Dịch vụ vệ sinh nhà ở, văn phòng và công nghiệp",
    template: "%s | Vệ Sinh Trúc Mai",
  },
  description:
    "Dịch vụ vệ sinh nhà ở, văn phòng và công nghiệp tại Hà Nội và Thanh Hóa. Quy trình rõ ràng, nhân sự đúng giờ và báo giá minh bạch.",
  keywords: [
    "vệ sinh trúc mai",
    "vệ sinh nhà ở",
    "vệ sinh văn phòng",
    "vệ sinh công nghiệp",
    "dịch vụ dọn nhà hà nội",
    "vệ sinh nhà thanh hóa",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Vệ Sinh Trúc Mai | Dịch vụ vệ sinh nhà ở, văn phòng và công nghiệp",
    description:
      "Dịch vụ vệ sinh nhà ở, văn phòng và công nghiệp tại Hà Nội và Thanh Hóa. Quy trình rõ ràng, nhân sự đúng giờ và báo giá minh bạch.",
    url: "/",
    siteName: "Vệ Sinh Trúc Mai",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vệ Sinh Trúc Mai",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vệ Sinh Trúc Mai | Dịch vụ vệ sinh nhà ở, văn phòng và công nghiệp",
    description:
      "Dịch vụ vệ sinh nhà ở, văn phòng và công nghiệp tại Hà Nội và Thanh Hóa. Quy trình rõ ràng, nhân sự đúng giờ và báo giá minh bạch.",
    images: ["/images/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    "name": siteConfig.brandName,
    "image": `${siteUrl}/images/og-image.png`,
    "url": siteUrl,
    "telephone": siteConfig.phone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address,
      "addressLocality": "Hà Nội",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 21.028511,
        "longitude": 105.804817
      },
      "radius": "50000"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "sameAs": siteConfig.socialLinks.map(link => link.href)
  };

  return (
    <html
      lang="vi"
      className={`${bodyFont.variable} ${headingFont.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-[linear-gradient(180deg,_#fffaf5_0%,_#ffffff_18%,_#ffffff_100%)] font-sans text-slate-900 antialiased">
        {gaMeasurementId ? (
          <GoogleAnalytics measurementId={gaMeasurementId} />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b border-orange-100/80 bg-white/92 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8 lg:px-12">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white shadow-[0_12px_30px_rgba(249,115,22,0.3)]">
                  TM
                </div>
                <div>
                  <div className="font-heading text-lg font-bold tracking-[-0.03em] text-slate-950">
                    {siteConfig.brandName}
                  </div>
                  <div className="text-sm text-slate-500">
                    {siteConfig.tagline}
                  </div>
                </div>
              </Link>

              <nav className="hidden items-center gap-8 md:flex">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-slate-600 transition hover:text-orange-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Link
                href={siteConfig.primaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                {siteConfig.primaryCta.label}
              </Link>
            </div>
          </header>

          {children}

          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
              <div className="max-w-xl">
                <h2 className="font-heading text-2xl font-bold tracking-[-0.03em] text-slate-950">
                  {siteConfig.brandName}
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {siteConfig.description}
                </p>
              </div>

              <div className="grid gap-2 text-sm text-slate-600">
                <p>Hotline: {siteConfig.phoneDisplay}</p>
                <p>Email: {siteConfig.email}</p>
                <p>{siteConfig.address}</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

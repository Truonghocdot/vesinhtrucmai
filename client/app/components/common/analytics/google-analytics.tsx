"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: "js" | "config" | "event",
      targetOrDate: string | Date,
      config?: Record<string, string | number | boolean | undefined>,
    ) => void;
  }
}

type GoogleAnalyticsProps = {
  measurementId: string;
};

function trackPageView(measurementId: string, pagePath: string) {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    send_to: measurementId,
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath,
  });
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    trackPageView(measurementId, pagePath);
  }, [measurementId, pathname, searchParams]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}

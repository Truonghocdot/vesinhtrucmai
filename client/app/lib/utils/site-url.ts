const FALLBACK_SITE_URL = "https://vesinhtrucmai.vn";

export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    FALLBACK_SITE_URL;

  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

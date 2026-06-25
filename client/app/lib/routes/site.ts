export const siteRoutes = {
  home: "/",
  about: "/gioi-thieu",
  pricing: "/bang-gia",
  services: "/dich-vu",
  blog: "/blog",
  booking: "/booking",
  contact: "/lien-he",
} as const;

export function getServicePath(serviceSlug: string) {
  return `${siteRoutes.services}/${serviceSlug}`;
}

export function getServiceLocationPath(
  serviceSlug: string,
  locationSlug: string,
) {
  return `${getServicePath(serviceSlug)}/${locationSlug}`;
}

export function getLocationPath(locationSlug: string) {
  return `/khu-vuc/${locationSlug}`;
}

export function getBlogPath(slug: string) {
  return `${siteRoutes.blog}/${slug}`;
}

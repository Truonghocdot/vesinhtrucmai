import type { ComponentType } from "react";

export type ActionLink = {
  label: string;
  href: string;
};

export type NavItem = ActionLink;

export type SocialLink = ActionLink;

export type HeroMetric = {
  value: string;
  label: string;
};

export type BenefitItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SeoFields = {
  title: string;
  description: string;
  keywords: string[];
};

export type HeroBlock = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: ActionLink;
  secondaryCta?: ActionLink;
  metrics?: HeroMetric[];
};

export type SiteConfig = {
  brandName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  siteUrl: string;
  serviceArea: string;
  businessHours: string[];
  navigation: NavItem[];
  socialLinks: SocialLink[];
  trustHighlights: string[];
  primaryCta: ActionLink;
  secondaryCta: ActionLink;
};

export type HomePageContent = {
  hero: HeroBlock;
  trustStrip: string[];
  reasonsTitle: string;
  reasons: BenefitItem[];
  featuredServiceSlugs: string[];
  featuredLocationSlugs: string[];
  pricingPreviewCodes: string[];
  cta: HeroBlock;
  seo: SeoFields;
};

export type AboutPageContent = {
  hero: HeroBlock;
  storyParagraphs: string[];
  commitments: BenefitItem[];
  seo: SeoFields;
};

export type ContactPageContent = {
  hero: HeroBlock;
  responsePromises: string[];
  seo: SeoFields;
};

export type ServicesPageContent = {
  hero: HeroBlock;
  seo: SeoFields;
};

export type BlogPageContent = {
  hero: HeroBlock;
  featuredTopic: string;
  seo: SeoFields;
};

export type PricingPageContent = {
  hero: HeroBlock;
  seo: SeoFields;
};

export type BookingFieldLabels = {
  fullName: string;
  phone: string;
  location: string;
  service: string;
  note: string;
};

export type BookingPageContent = {
  hero: HeroBlock;
  introPoints: string[];
  sidebarTitle: string;
  sidebarPoints: string[];
  fieldLabels: BookingFieldLabels;
  ctaCopy: string;
  seo: SeoFields;
};

export type Service = {
  slug: string;
  name: string;
  excerpt: string;
  summary: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    highlights: string[];
  };
  cardHighlights: string[];
  benefits: BenefitItem[];
  faq: FaqItem[];
  pricingRefs: string[];
  coverageRefs: string[];
  seo: SeoFields;
};

export type LocationServiceHighlight = {
  serviceSlug: string;
  blurb: string;
};

export type Location = {
  slug: string;
  name: string;
  intro: string;
  districts: string[];
  focusAreas: string[];
  serviceHighlights: LocationServiceHighlight[];
  seo: SeoFields;
};

export type PricingItem = {
  label: string;
  price: string;
  note?: string;
};

export type PricingPackage = {
  code: string;
  name: string;
  appliesTo: string[];
  summary: string;
  items: PricingItem[];
  notes: string[];
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage: string;
  keywords: string[];
  locationRefs: string[];
  serviceRefs: string[];
  readingTime: string;
  seoTitle: string;
  seoDescription: string;
};

export type BlogPost = BlogPostMeta & {
  Content: ComponentType;
};

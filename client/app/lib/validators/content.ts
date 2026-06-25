import { z } from "zod";

const actionLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const heroMetricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

const benefitSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(1),
});

const heroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  primaryCta: actionLinkSchema,
  secondaryCta: actionLinkSchema.optional(),
  metrics: z.array(heroMetricSchema).optional(),
});

export const siteConfigSchema = z.object({
  brandName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  phone: z.string().min(1),
  phoneDisplay: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  siteUrl: z.string().url(),
  serviceArea: z.string().min(1),
  businessHours: z.array(z.string().min(1)).min(1),
  navigation: z.array(actionLinkSchema).min(1),
  socialLinks: z.array(actionLinkSchema).min(1),
  trustHighlights: z.array(z.string().min(1)).min(1),
  primaryCta: actionLinkSchema,
  secondaryCta: actionLinkSchema,
});

export const homePageSchema = z.object({
  hero: heroSchema,
  trustStrip: z.array(z.string().min(1)).min(1),
  reasonsTitle: z.string().min(1),
  reasons: z.array(benefitSchema).min(1),
  featuredServiceSlugs: z.array(z.string().min(1)).min(1),
  featuredLocationSlugs: z.array(z.string().min(1)).min(1),
  pricingPreviewCodes: z.array(z.string().min(1)).min(1),
  cta: heroSchema,
  seo: seoSchema,
});

export const aboutPageSchema = z.object({
  hero: heroSchema,
  storyParagraphs: z.array(z.string().min(1)).min(1),
  commitments: z.array(benefitSchema).min(1),
  seo: seoSchema,
});

export const contactPageSchema = z.object({
  hero: heroSchema,
  responsePromises: z.array(z.string().min(1)).min(1),
  seo: seoSchema,
});

export const servicesPageSchema = z.object({
  hero: heroSchema,
  seo: seoSchema,
});

export const blogPageSchema = z.object({
  hero: heroSchema,
  featuredTopic: z.string().min(1),
  seo: seoSchema,
});

export const pricingPageSchema = z.object({
  hero: heroSchema,
  seo: seoSchema,
});

export const bookingPageSchema = z.object({
  hero: heroSchema,
  introPoints: z.array(z.string().min(1)).min(1),
  sidebarTitle: z.string().min(1),
  sidebarPoints: z.array(z.string().min(1)).min(1),
  fieldLabels: z.object({
    fullName: z.string().min(1),
    phone: z.string().min(1),
    location: z.string().min(1),
    service: z.string().min(1),
    note: z.string().min(1),
  }),
  ctaCopy: z.string().min(1),
  seo: seoSchema,
});

export const serviceSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  excerpt: z.string().min(1),
  summary: z.string().min(1),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    highlights: z.array(z.string().min(1)).min(1),
  }),
  cardHighlights: z.array(z.string().min(1)).min(1),
  benefits: z.array(benefitSchema).min(1),
  faq: z.array(faqSchema).min(1),
  pricingRefs: z.array(z.string().min(1)).min(1),
  coverageRefs: z.array(z.string().min(1)).min(1),
  seo: seoSchema,
});

export const locationSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  intro: z.string().min(1),
  districts: z.array(z.string().min(1)).min(1),
  focusAreas: z.array(z.string().min(1)).min(1),
  serviceHighlights: z
    .array(
      z.object({
        serviceSlug: z.string().min(1),
        blurb: z.string().min(1),
      }),
    )
    .min(1),
  seo: seoSchema,
});

export const pricingPackageSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  appliesTo: z.array(z.string().min(1)).min(1),
  summary: z.string().min(1),
  items: z
    .array(
      z.object({
        label: z.string().min(1),
        price: z.string().min(1),
        note: z.string().min(1).optional(),
      }),
    )
    .min(1),
  notes: z.array(z.string().min(1)).min(1),
});

export const blogFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.string().min(1),
  coverImage: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(1),
  locationRefs: z.array(z.string().min(1)).min(1),
  serviceRefs: z.array(z.string().min(1)).min(1),
  readingTime: z.string().min(1),
  seoTitle: z.string().min(1),
  seoDescription: z.string().min(1),
});

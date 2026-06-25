import { cache } from "react";

import { readContentJson } from "@/lib/content/base";
import {
  aboutPageSchema,
  blogPageSchema,
  bookingPageSchema,
  contactPageSchema,
  homePageSchema,
  pricingPageSchema,
  servicesPageSchema,
} from "@/lib/validators/content";
import type {
  AboutPageContent,
  BlogPageContent,
  BookingPageContent,
  ContactPageContent,
  HomePageContent,
  PricingPageContent,
  ServicesPageContent,
} from "@/types/content";

export const getHomePageContent = cache(async (): Promise<HomePageContent> => {
  return readContentJson(["pages", "home.json"], homePageSchema);
});

export const getAboutPageContent = cache(
  async (): Promise<AboutPageContent> => {
    return readContentJson(["pages", "about.json"], aboutPageSchema);
  },
);

export const getContactPageContent = cache(
  async (): Promise<ContactPageContent> => {
    return readContentJson(["pages", "contact.json"], contactPageSchema);
  },
);

export const getServicesPageContent = cache(
  async (): Promise<ServicesPageContent> => {
    return readContentJson(["pages", "services.json"], servicesPageSchema);
  },
);

export const getBlogPageContent = cache(async (): Promise<BlogPageContent> => {
  return readContentJson(["pages", "blog.json"], blogPageSchema);
});

export const getPricingPageContent = cache(
  async (): Promise<PricingPageContent> => {
    return readContentJson(["pages", "pricing.json"], pricingPageSchema);
  },
);

export const getBookingPageContent = cache(
  async (): Promise<BookingPageContent> => {
    return readContentJson(["pages", "booking.json"], bookingPageSchema);
  },
);

export type BookingRequestDraft = {
  fullName: string;
  phone: string;
  location: string;
  service: string;
  note: string;
};

export type PricingIntent = {
  status: "not-implemented";
  draft: BookingRequestDraft;
  nextStep: string;
};

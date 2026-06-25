import type { BookingRequestDraft, PricingIntent } from "@/types/booking";

export function createPricingIntent(
  draft: BookingRequestDraft,
): PricingIntent {
  return {
    status: "not-implemented",
    draft,
    nextStep:
      "Sprint sau se bo sung cong cu tinh gia dua tren khu vuc, loai dich vu va muc do thi cong.",
  };
}

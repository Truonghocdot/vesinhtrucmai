import { cache } from "react";
import { z } from "zod";

import { readContentJson } from "@/lib/content/base";
import { pricingPackageSchema } from "@/lib/validators/content";
import type { PricingPackage } from "@/types/content";

const pricingPackagesSchema = z.array(pricingPackageSchema);

export const getPricingPackages = cache(
  async (): Promise<PricingPackage[]> => {
    return readContentJson(
      ["pricing", "packages.json"],
      pricingPackagesSchema,
    );
  },
);

export async function getPricingPackagesForService(serviceSlug: string) {
  const packages = await getPricingPackages();
  return packages.filter((pkg) => pkg.appliesTo.includes(serviceSlug));
}

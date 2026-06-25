import { cache } from "react";

import { readContentJson } from "@/lib/content/base";
import { siteConfigSchema } from "@/lib/validators/content";
import type { SiteConfig } from "@/types/content";

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  return readContentJson(["site", "site.json"], siteConfigSchema);
});

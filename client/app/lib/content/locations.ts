import { cache } from "react";

import { listContentFiles, readContentJson } from "@/lib/content/base";
import { locationSchema } from "@/lib/validators/content";
import type { Location } from "@/types/content";

export const getAllLocations = cache(async (): Promise<Location[]> => {
  const files = await listContentFiles(["locations"], ".json");

  const locations = await Promise.all(
    files.map((file) => readContentJson(["locations", file], locationSchema)),
  );

  return locations.sort((left, right) => left.name.localeCompare(right.name));
});

export async function getLocationBySlug(
  slug: string,
): Promise<Location | undefined> {
  const locations = await getAllLocations();
  return locations.find((location) => location.slug === slug);
}

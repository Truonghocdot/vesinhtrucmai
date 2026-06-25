import { cache } from "react";

import { listContentFiles, readContentJson } from "@/lib/content/base";
import { serviceSchema } from "@/lib/validators/content";
import type { Service } from "@/types/content";

export const getAllServices = cache(async (): Promise<Service[]> => {
  const files = await listContentFiles(["services"], ".json");

  const services = await Promise.all(
    files.map((file) => readContentJson(["services", file], serviceSchema)),
  );

  return services.sort((left, right) => left.name.localeCompare(right.name));
});

export async function getServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  const services = await getAllServices();
  return services.find((service) => service.slug === slug);
}

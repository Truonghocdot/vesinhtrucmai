import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { ZodType } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "app", "content");

export function resolveContentPath(...segments: string[]) {
  return path.join(CONTENT_ROOT, ...segments);
}

export async function readContentJson<T>(
  segments: string[],
  schema: ZodType<T>,
): Promise<T> {
  const filePath = resolveContentPath(...segments);
  const source = await readFile(filePath, "utf8");
  const json = JSON.parse(source) as unknown;

  return schema.parse(json);
}

export async function listContentFiles(
  segments: string[],
  extension: string,
): Promise<string[]> {
  const dir = resolveContentPath(...segments);
  const entries = await readdir(dir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

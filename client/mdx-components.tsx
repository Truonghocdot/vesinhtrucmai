import Link from "next/link";
import type { MDXComponents } from "mdx/types";

const baseHeading =
  "font-heading scroll-mt-28 tracking-tight text-ink-950";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ className, ...props }) => (
      <h2
        className={[baseHeading, "mt-12 text-3xl", className].join(" ")}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={[baseHeading, "mt-10 text-2xl", className].join(" ")}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={[
          "text-base leading-8 text-ink-700 md:text-lg",
          className,
        ].join(" ")}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={[
          "my-6 list-disc space-y-3 pl-6 text-base leading-8 text-ink-700 md:text-lg",
          className,
        ].join(" ")}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={[
          "my-6 list-decimal space-y-3 pl-6 text-base leading-8 text-ink-700 md:text-lg",
          className,
        ].join(" ")}
        {...props}
      />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={[
          "my-8 rounded-3xl border border-brand-200 bg-brand-50 px-6 py-5 text-lg text-ink-800",
          className,
        ].join(" ")}
        {...props}
      />
    ),
    table: ({ className, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-3xl border border-ink-100">
        <table
          className={[
            "min-w-full border-collapse text-left text-sm md:text-base",
            className,
          ].join(" ")}
          {...props}
        />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={[
          "bg-ink-950 px-4 py-3 font-semibold text-white",
          className,
        ].join(" ")}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={[
          "border-t border-ink-100 px-4 py-3 align-top text-ink-700",
          className,
        ].join(" ")}
        {...props}
      />
    ),
    a: ({ href = "", className, ...props }) =>
      href.startsWith("/") ? (
        <Link
          href={href}
          className={[
            "font-semibold text-brand-600 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-700",
            className,
          ].join(" ")}
          {...props}
        />
      ) : (
        <a
          href={href}
          className={[
            "font-semibold text-brand-600 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-700",
            className,
          ].join(" ")}
          rel="noreferrer"
          target="_blank"
          {...props}
        />
      ),
    ...components,
  };
}

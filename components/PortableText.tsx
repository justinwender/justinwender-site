import { PortableText as PortableTextRenderer } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

import { urlFor } from "../sanity/lib/image";

type SanityImageValue = {
  _type: "image";
  alt?: string;
  asset?: { _ref?: string };
};

type SanityCodeValue = {
  _type: "code";
  code?: string;
  language?: string;
  filename?: string;
};

type SanityLinkValue = {
  _type: "link";
  href: string;
  openInNewTab?: boolean;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl leading-tight mt-12 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl leading-snug mt-10 first:mt-0">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent pl-5 italic text-text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc pl-6 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal pl-6 space-y-1">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-[0.92em] text-accent">{children}</code>
    ),
    link: ({ children, value }) => {
      const v = value as SanityLinkValue | undefined;
      const href = v?.href ?? "#";
      const newTab = v?.openInNewTab;
      return (
        <a
          href={href}
          {...(newTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
        >
          {children}
          {newTab && <span aria-hidden="true">&nbsp;↗</span>}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const v = value as SanityImageValue;
      if (!v.asset?._ref) return null;
      if (!v.alt) {
        // eslint-disable-next-line no-console
        console.warn(
          `PortableText: image asset ${v.asset._ref} is missing alt text.`,
        );
      }
      const dims = parseImageDimensions(v.asset._ref);
      const src = urlFor(v).width(1360).fit("max").auto("format").url();
      return (
        <figure className="mt-8">
          <Image
            src={src}
            alt={v.alt ?? ""}
            width={dims.width}
            height={dims.height}
            sizes="(min-width: 768px) 680px, 100vw"
            className="w-full h-auto rounded-md"
          />
          {v.alt && (
            <figcaption className="mt-2 text-sm text-text-muted">
              {v.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      const v = value as SanityCodeValue;
      return (
        <div className="relative mt-6">
          <pre className="font-mono text-sm leading-relaxed border border-rule rounded-md bg-rule/40 p-4 pr-20 overflow-x-auto">
            <code>{v.code}</code>
          </pre>
          {v.language && (
            <span className="pointer-events-none absolute top-2 right-3 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              {v.language}
            </span>
          )}
          {v.filename && (
            <div className="mt-1 font-mono text-xs text-text-muted">
              {v.filename}
            </div>
          )}
        </div>
      );
    },
  },
};

function parseImageDimensions(ref: string): { width: number; height: number } {
  // image-<id>-<width>x<height>-<ext>
  const match = ref.match(/^image-[^-]+-(\d+)x(\d+)-\w+$/);
  if (!match) return { width: 1360, height: 1360 };
  return { width: Number(match[1]), height: Number(match[2]) };
}

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextRenderer value={value} components={components} />;
}

import { PortableText as PortableTextRenderer } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

import { dataset, projectId } from "../sanity/env";

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

function imageUrl(ref: string): { src: string; width: number; height: number } | null {
  // image-<id>-<width>x<height>-<ext>
  const match = ref.match(/^image-([^-]+)-(\d+)x(\d+)-(\w+)$/);
  if (!match) return null;
  const [, id, width, height, ext] = match;
  return {
    src: `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${width}x${height}.${ext}`,
    width: Number(width),
    height: Number(height),
  };
}

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
      const ref = v.asset?._ref;
      if (!ref) return null;
      const img = imageUrl(ref);
      if (!img) return null;
      return (
        <figure className="mt-8">
          <Image
            src={img.src}
            alt={v.alt ?? ""}
            width={img.width}
            height={img.height}
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
        <div className="mt-6">
          {v.filename && (
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted mb-1">
              {v.filename}
            </div>
          )}
          <pre className="font-mono text-sm leading-relaxed border border-rule rounded-md p-4 overflow-x-auto">
            <code>{v.code}</code>
          </pre>
        </div>
      );
    },
  },
};

export default function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextRenderer value={value} components={components} />;
}

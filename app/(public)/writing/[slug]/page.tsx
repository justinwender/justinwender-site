import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "../../../../components/Container";
import PortableText from "../../../../components/PortableText";
import { sanityFetch } from "../../../../sanity/lib/fetch";
import { postBySlugQuery, postSlugsQuery } from "../../../../sanity/lib/queries";
import type { Post } from "../../../../sanity/types";

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await sanityFetch<string[]>({ query: postSlugsQuery });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
  });
  if (!post) return {};
  return {
    title: `${post.title} — Justin Wender`,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
  });

  if (!post) notFound();

  return (
    <Container>
      <div className="py-20">
        <p className="text-sm">
          <Link
            href="/writing"
            className="text-text-muted hover:text-text transition-colors"
          >
            ← Back to writing
          </Link>
        </p>

        <h1 className="font-serif text-5xl leading-[1.1] mt-8">{post.title}</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          {formatDate(post.publishedAt)}
        </p>
        {post.tags && post.tags.length > 0 && (
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
            {post.tags.join(" · ")}
          </p>
        )}

        <hr className="my-10 border-rule" />

        {post.body && <PortableText value={post.body} />}
      </div>
    </Container>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

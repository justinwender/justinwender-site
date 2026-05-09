import Link from "next/link";

import Container from "../../../components/Container";
import { sanityFetch } from "../../../sanity/lib/fetch";
import {
  allExternalPublicationsQuery,
  allPostsQuery,
} from "../../../sanity/lib/queries";
import type { ExternalPublication, PostListItem } from "../../../sanity/types";

export const metadata = {
  title: "Writing — Justin Wender",
  description: "Posts and external publications by Justin Wender.",
};

export default async function WritingIndex() {
  const [posts, external] = await Promise.all([
    sanityFetch<PostListItem[]>({ query: allPostsQuery }),
    sanityFetch<ExternalPublication[]>({ query: allExternalPublicationsQuery }),
  ]);

  return (
    <Container>
      <div className="py-20">
        <h1 className="font-serif text-5xl leading-[1.1]">Writing</h1>

        {posts.length === 0 ? (
          <p className="mt-10 text-text-muted">
            Writing coming soon. In the meantime, see{" "}
            <Link
              href="/projects"
              className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              projects
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-rule">
            {posts.map((post) => (
              <li key={post._id} className="py-8 first:pt-0">
                <PostRow post={post} />
              </li>
            ))}
          </ul>
        )}

        {external.length > 0 && (
          <section className="mt-20">
            <h2 className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Elsewhere
            </h2>
            <div className="h-px w-8 bg-accent mt-1 mb-6" />

            <ul className="divide-y divide-rule">
              {external.map((item) => (
                <li key={item._id} className="py-8 first:pt-0">
                  <ExternalRow item={item} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Container>
  );
}

function PostRow({ post }: { post: PostListItem }) {
  return (
    <article>
      <Link
        href={`/writing/${post.slug.current}`}
        className="font-serif text-2xl text-text hover:underline underline-offset-4 decoration-1"
      >
        {post.title}
      </Link>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-text-muted">
        {formatDate(post.publishedAt)}
      </p>
      {post.summary && <p className="mt-3 text-text-muted">{post.summary}</p>}
      {post.tags && post.tags.length > 0 && <TagList tags={post.tags} />}
    </article>
  );
}

function ExternalRow({ item }: { item: ExternalPublication }) {
  return (
    <article>
      <h3 className="font-serif text-xl text-text">{item.title}</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-text-muted">
        {[item.publication, item.date && formatDate(item.date)]
          .filter(Boolean)
          .join(" · ")}
      </p>
      {item.summary && (
        <p className="mt-3 text-text-muted">{item.summary}</p>
      )}
      {item.url && (
        <p className="mt-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
          >
            Read at {item.publication ?? "source"}
            <span aria-hidden="true">&nbsp;↗</span>
          </a>
        </p>
      )}
    </article>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
      {tags.join(" · ")}
    </p>
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

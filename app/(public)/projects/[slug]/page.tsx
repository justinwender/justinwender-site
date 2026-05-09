import { BookOpen, ExternalLink, FileText, Github, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "../../../../components/Container";
import PortableText from "../../../../components/PortableText";
import { sanityFetch } from "../../../../sanity/lib/fetch";
import { urlFor } from "../../../../sanity/lib/image";
import {
  projectBySlugQuery,
  projectSlugsQuery,
} from "../../../../sanity/lib/queries";
import type {
  Project,
  ProjectLinkType,
  ProjectStatus,
} from "../../../../sanity/types";

type RouteParams = { slug: string };

const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

const linkIcon: Record<ProjectLinkType, LucideIcon> = {
  repo: Github,
  demo: ExternalLink,
  paper: FileText,
  writeup: BookOpen,
};

export async function generateStaticParams(): Promise<RouteParams[]> {
  const slugs = await sanityFetch<string[]>({ query: projectSlugsQuery });
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
  });
  if (!project) return {};
  return {
    title: `${project.title} — Justin Wender`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
  });

  if (!project) notFound();

  const heroSrc = project.heroImage?.asset?._ref
    ? urlFor(project.heroImage).width(1360).fit("max").auto("format").url()
    : null;
  const heroDims = project.heroImage?.asset?._ref
    ? parseDims(project.heroImage.asset._ref)
    : null;

  return (
    <Container>
      <div className="py-20">
        <p className="text-sm">
          <Link
            href="/projects"
            className="text-text-muted hover:text-text transition-colors"
          >
            ← Back to projects
          </Link>
        </p>

        {project.disclaimer && (
          <aside className="mt-8 border border-rule rounded-md bg-rule/40 px-4 py-3 text-sm text-text-muted">
            {project.disclaimer}
          </aside>
        )}

        {project.status && (
          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-text-muted">
            {statusLabel[project.status]}
          </p>
        )}

        <h1 className="font-serif text-5xl leading-[1.1] mt-2">
          {project.title}
        </h1>

        {project.summary && (
          <p className="mt-4 text-lg">{project.summary}</p>
        )}

        {project.tags && project.tags.length > 0 && (
          <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
            {project.tags.join(" · ")}
          </p>
        )}

        {heroSrc && heroDims && (
          <figure className="mt-10">
            <Image
              src={heroSrc}
              alt={project.heroImage?.alt ?? project.title}
              width={heroDims.width}
              height={heroDims.height}
              sizes="(min-width: 768px) 680px, 100vw"
              className="w-full h-auto rounded-md"
              priority
            />
          </figure>
        )}

        {project.links && project.links.length > 0 && (
          <section className="mt-12">
            <h2 className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Links
            </h2>
            <div className="h-px w-8 bg-accent mt-1 mb-4" />
            <ul className="space-y-2">
              {project.links.map((link) => {
                const Icon = linkIcon[link.type];
                return (
                  <li key={`${link.type}:${link.url}`}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
                    >
                      {Icon && <Icon size={16} aria-hidden="true" />}
                      <span>{link.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {project.body && project.body.length > 0 && (
          <div className="mt-12">
            <PortableText value={project.body} />
          </div>
        )}
      </div>
    </Container>
  );
}

function parseDims(ref: string): { width: number; height: number } {
  const match = ref.match(/^image-[^-]+-(\d+)x(\d+)-\w+$/);
  if (!match) return { width: 1360, height: 1360 };
  return { width: Number(match[1]), height: Number(match[2]) };
}

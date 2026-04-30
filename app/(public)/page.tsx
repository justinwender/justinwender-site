import Link from "next/link";

import Container from "../../components/Container";
import { sanityFetch } from "../../sanity/lib/fetch";
import { featuredProjectsQuery } from "../../sanity/lib/queries";
import type { ProjectListItem } from "../../sanity/types";

export default async function HomePage() {
  const projects = await sanityFetch<ProjectListItem[]>({
    query: featuredProjectsQuery,
  });

  return (
    <Container>
      <div className="py-20">
        <header>
          <h1 className="font-serif text-5xl leading-[1.1]">Justin Wender</h1>
          <p className="mt-4 text-lg">
            I work on crypto data infrastructure, currently as a BDR at Allium.
          </p>
        </header>

        <p className="mt-8">
          Most of my work sits between economics, game theory, and the practical
          problems of building trustworthy systems on public data. This site is
          where I put longer-form work: research, projects, and occasional
          writing.
        </p>

        <section className="mt-20">
          <h2 className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Selected projects
          </h2>
          <div className="h-px w-8 bg-accent mt-1 mb-6" />

          {projects.length === 0 ? (
            <p className="text-text-muted">No featured projects yet.</p>
          ) : (
            <ul className="space-y-5">
              {projects.map((project) => (
                <li key={project._id}>
                  <ProjectListRow project={project} />
                </li>
              ))}
            </ul>
          )}

          <p className="mt-10">
            <Link
              href="/projects"
              className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              See all projects →
            </Link>
          </p>
        </section>

        <section className="mt-16">
          <p className="text-sm text-text-muted">
            <Link
              href="/writing"
              className="hover:text-text transition-colors"
            >
              Writing coming soon →
            </Link>
          </p>
        </section>
      </div>
    </Container>
  );
}

function ProjectListRow({ project }: { project: ProjectListItem }) {
  const slug = project.slug?.current;
  const titleEl = (
    <span className="font-serif text-xl text-text">{project.title}</span>
  );
  return (
    <article>
      {slug ? (
        <Link
          href={`/projects/${slug}`}
          className="hover:underline underline-offset-4 decoration-1"
        >
          {titleEl}
        </Link>
      ) : (
        titleEl
      )}
      {project.summary && (
        <p className="mt-1 text-text-muted">{project.summary}</p>
      )}
    </article>
  );
}

import Link from "next/link";

import Container from "../../../components/Container";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { allProjectsQuery } from "../../../sanity/lib/queries";
import type { ProjectListItem, ProjectStatus } from "../../../sanity/types";

export const metadata = {
  title: "Projects — Justin Wender",
  description: "Things I've built and shipped.",
};

const statusLabel: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

export default async function ProjectsIndex() {
  const projects = await sanityFetch<ProjectListItem[]>({
    query: allProjectsQuery,
  });

  return (
    <Container>
      <div className="py-20">
        <h1 className="font-serif text-5xl leading-[1.1]">Projects</h1>

        {projects.length === 0 ? (
          <p className="mt-10 text-text-muted">Nothing here yet.</p>
        ) : (
          <ul className="mt-10 divide-y divide-rule">
            {projects.map((project) => (
              <li key={project._id} className="py-8 first:pt-0">
                <ProjectRow project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}

function ProjectRow({ project }: { project: ProjectListItem }) {
  const slug = project.slug?.current;
  return (
    <article>
      {project.status && (
        <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
          {statusLabel[project.status]}
        </p>
      )}
      <h2 className="font-serif text-2xl text-text mt-1">
        {slug ? (
          <Link
            href={`/projects/${slug}`}
            className="hover:underline underline-offset-4 decoration-1"
          >
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h2>
      {project.summary && (
        <p className="mt-2 text-text-muted">{project.summary}</p>
      )}
      {project.tags && project.tags.length > 0 && (
        <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
          {project.tags.join(" · ")}
        </p>
      )}
    </article>
  );
}

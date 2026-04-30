import type { ReactNode } from "react";

import Container from "../../../components/Container";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { siteSettingsQuery } from "../../../sanity/lib/queries";
import type { SiteSettings } from "../../../sanity/types";

export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings>({ query: siteSettingsQuery });
  const email = settings.contactEmail;
  const tagline = settings.contactTagline;
  const social = settings.socialLinks ?? [];

  return (
    <Container>
      <div className="py-20">
        <h1 className="font-serif text-5xl leading-[1.1]">Contact</h1>

        {tagline && <p className="mt-4">{tagline}</p>}

        <dl className="mt-10 space-y-5 sm:space-y-3">
          {email && (
            <ContactRow label="Email">
              <a
                href={`mailto:${email}`}
                className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
              >
                {email}
              </a>
            </ContactRow>
          )}
          {social.map((link) => (
            <ContactRow key={`${link.platform}:${link.url}`} label={link.platform}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
              >
                {link.url.replace(/^https?:\/\//, "")}
                <span aria-hidden="true">&nbsp;↗</span>
              </a>
            </ContactRow>
          ))}
        </dl>
      </div>
    </Container>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-y-1 sm:gap-x-6">
      <dt className="text-text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

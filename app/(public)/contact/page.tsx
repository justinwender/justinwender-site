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

        <ul className="mt-10 space-y-3">
          {email && (
            <li>
              <span className="text-text-muted mr-2">Email</span>
              <a
                href={`mailto:${email}`}
                className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
              >
                {email}
              </a>
            </li>
          )}
          {social.map((link) => (
            <li key={`${link.platform}:${link.url}`}>
              <span className="text-text-muted mr-2">{link.platform}</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
              >
                {link.url.replace(/^https?:\/\//, "")}
                <span aria-hidden="true">&nbsp;↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

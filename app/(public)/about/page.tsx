import Container from "../../../components/Container";
import PortableText from "../../../components/PortableText";
import { sanityFetch } from "../../../sanity/lib/fetch";
import { aboutPageQuery } from "../../../sanity/lib/queries";
import type { AboutPage } from "../../../sanity/types";

export default async function AboutPageRoute() {
  const about = await sanityFetch<AboutPage | null>({ query: aboutPageQuery });

  return (
    <Container>
      <div className="py-20">
        <h1 className="font-serif text-5xl leading-[1.1] mb-10">About</h1>
        {about?.body && about.body.length > 0 ? (
          <PortableText value={about.body} />
        ) : (
          <p className="text-text-muted">Nothing here yet.</p>
        )}
      </div>
    </Container>
  );
}

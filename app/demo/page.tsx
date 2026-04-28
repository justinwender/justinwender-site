import Container from "../../components/Container";

export default function DemoPage() {
  return (
    <Container>
      <main className="py-16">
        <header className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Design system
          </p>
          <h1 className="font-serif text-5xl leading-[1.1] mt-3">
            Typography &amp; tokens
          </h1>
          <p className="text-text-muted mt-4">
            Scratch page for judging the type and color choices in isolation.
            Not linked from anywhere.
          </p>
        </header>

        <NavMock />

        <Section title="Headings">
          <h1 className="font-serif text-5xl leading-[1.1]">
            Heading one in Instrument Serif
          </h1>
          <h2 className="font-serif text-3xl leading-tight mt-8">
            Heading two — quieter, still display
          </h2>
          <h3 className="font-serif text-2xl leading-snug mt-6">
            Heading three for sub-sections
          </h3>
        </Section>

        <Section title="Body copy">
          <p>
            The body face is Inter at a comfortable reading size with line-height
            1.7. The reading width is capped at 680px so lines never run long
            enough to lose your place. This paragraph exists to be long enough
            to wrap several times — long enough to judge whether the rhythm of
            line-height and measure feels settled, or whether the lines are
            running too tight, too loose, or too wide. Adjust the container or
            the body line-height if it doesn&rsquo;t feel right.
          </p>
          <p className="mt-4">
            A second paragraph follows with normal spacing. Inline emphasis can
            be <strong>bold</strong> or <em>italic</em>, and occasionally{" "}
            <em>
              <strong>both at once</strong>
            </em>{" "}
            when the sentence really needs it. Avoid using emphasis as
            decoration — it should mean something.
          </p>
        </Section>

        <Section title="Links">
          <p>
            An{" "}
            <a
              href="#"
              className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              inline link to elsewhere on the site
            </a>{" "}
            uses the accent color with a thin underline that thickens on hover.
            An external link such as{" "}
            <a
              href="https://www.are.na"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              are.na<span aria-hidden="true">&nbsp;↗</span>
            </a>{" "}
            picks up the same treatment plus a small arrow to flag that it
            leaves the site.
          </p>
        </Section>

        <Section title="Code">
          <p>
            Inline code in JetBrains Mono looks like{" "}
            <code className="font-mono text-[0.92em] text-accent">
              const answer = 42
            </code>{" "}
            within a paragraph.
          </p>
          <pre className="font-mono text-sm leading-relaxed mt-4 border border-rule rounded-md p-4 overflow-x-auto">
            <code>{`function greet(name) {
  return \`hello, \${name}\`;
}

greet("world");`}</code>
          </pre>
        </Section>

        <Section title="Blockquote">
          <blockquote className="border-l-2 border-accent pl-5 italic font-serif text-xl leading-snug text-text">
            &ldquo;Anything one man can imagine, other men can make real.&rdquo;
            <footer className="mt-2 not-italic font-sans text-sm text-text-muted">
              &mdash; Jules Verne
            </footer>
          </blockquote>
        </Section>

        <Section title="Lists">
          <ul className="list-disc pl-6 space-y-1">
            <li>Bulleted lists use a tight space-y so items breathe.</li>
            <li>The bullet itself sits at the muted color via the marker.</li>
            <li>Three or four items is usually the sweet spot.</li>
          </ul>
          <ol className="list-decimal pl-6 space-y-1 mt-6">
            <li>Numbered lists step through ordered things.</li>
            <li>The numerals match the body face.</li>
            <li>Nested lists are not styled here — keep nesting shallow.</li>
          </ol>
        </Section>

        <Section title="Metadata text">
          <p className="text-sm text-text-muted">
            April 26, 2026 &middot; 7 min read &middot; tags: design, type
          </p>
        </Section>

        <Section title="Horizontal rule">
          <p>Above the rule.</p>
          <hr className="my-6 border-rule" />
          <p>Below the rule.</p>
        </Section>
      </main>
    </Container>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {title}
      </h2>
      <div className="h-px w-8 bg-accent mt-1 mb-6" />
      {children}
    </section>
  );
}

function NavMock() {
  return (
    <nav className="mt-10 flex gap-6 text-sm font-sans">
      <span className="text-text-muted">Writing</span>
      <span className="text-text-muted">Projects</span>
      <span className="relative text-text">
        About
        <span className="absolute left-0 right-0 -bottom-1 h-px bg-accent" />
      </span>
      <span className="text-text-muted">Contact</span>
    </nav>
  );
}

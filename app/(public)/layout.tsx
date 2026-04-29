import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { sanityFetch } from "../../sanity/lib/fetch";
import { siteSettingsQuery } from "../../sanity/lib/queries";
import type { SiteSettings } from "../../sanity/types";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await sanityFetch<SiteSettings>({
    query: siteSettingsQuery,
  });

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer siteSettings={siteSettings ?? {}} />
    </>
  );
}

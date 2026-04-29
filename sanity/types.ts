import type { PortableTextBlock } from "@portabletext/types";

export type SocialLink = {
  platform: string;
  url: string;
};

export type SiteSettings = {
  contactEmail?: string;
  contactTagline?: string;
  socialLinks?: SocialLink[];
};

export type AboutPage = {
  body?: PortableTextBlock[];
};

export type ProjectStatus = "active" | "completed" | "archived";

export type ProjectListItem = {
  _id: string;
  title: string;
  slug?: { current: string };
  summary?: string;
  status?: ProjectStatus;
  tags?: string[];
};

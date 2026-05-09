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

export type SanityImage = {
  asset?: { _ref?: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type ProjectLinkType = "repo" | "demo" | "paper" | "writeup";

export type ProjectLink = {
  label: string;
  url: string;
  type: ProjectLinkType;
};

export type ProjectListItem = {
  _id: string;
  title: string;
  slug?: { current: string };
  summary?: string;
  status?: ProjectStatus;
  tags?: string[];
  heroImage?: SanityImage;
};

export type Project = ProjectListItem & {
  order?: number;
  body?: PortableTextBlock[];
  links?: ProjectLink[];
  disclaimer?: string;
  featured?: boolean;
};

export type PostListItem = {
  _id: string;
  slug: { current: string };
  title: string;
  publishedAt: string;
  summary?: string;
  tags?: string[];
};

export type Post = PostListItem & {
  body?: PortableTextBlock[];
  featured?: boolean;
  draft?: boolean;
};

export type ExternalPublication = {
  _id: string;
  title: string;
  publication?: string;
  date?: string;
  url?: string;
  summary?: string;
};

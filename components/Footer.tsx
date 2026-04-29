import { Github, Linkedin, Mail, Twitter, type LucideIcon } from "lucide-react";

import type { SiteSettings, SocialLink } from "../sanity/types";

import Container from "./Container";

const iconMap: Record<string, LucideIcon> = {
  twitter: Twitter,
  x: Twitter,
  "x / twitter": Twitter,
  linkedin: Linkedin,
  github: Github,
  email: Mail,
  mail: Mail,
};

function iconFor(platform: string): LucideIcon | null {
  return iconMap[platform.trim().toLowerCase()] ?? null;
}

export default function Footer({ siteSettings }: { siteSettings: SiteSettings }) {
  const socialLinks = siteSettings.socialLinks ?? [];

  return (
    <footer className="mt-24 border-t border-rule text-text-muted">
      <Container>
        <div className="flex items-center justify-between py-8 text-sm">
          <p>© 2026 Justin Wender</p>
          <ul className="flex items-center gap-4">
            {socialLinks.map((link: SocialLink) => {
              const Icon = iconFor(link.platform);
              if (!Icon) return null;
              return (
                <li key={`${link.platform}:${link.url}`}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="inline-flex hover:text-text transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

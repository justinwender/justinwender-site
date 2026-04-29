"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="border-b border-rule">
      <Container>
        <div className="flex items-center justify-between py-6">
          <Link
            href="/"
            className="font-serif text-xl text-text"
            aria-label="Justin Wender — home"
          >
            <span className="hidden sm:inline">Justin Wender</span>
            <span className="sm:hidden">JW</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-7 text-sm font-sans">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(pathname, link.href)}
              />
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="sm:hidden text-text"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav className="sm:hidden pb-4 flex flex-col gap-3 text-sm font-sans">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(pathname, link.href)}
              />
            ))}
          </nav>
        )}
      </Container>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "relative text-text"
          : "text-text-muted hover:text-text transition-colors"
      }
    >
      {label}
      {active && (
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 -bottom-1 h-px bg-accent"
        />
      )}
    </Link>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import { LanguageSelector } from "@/components/ui/language-selector";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Get The App", href: "#get-the-app" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // Pinned to the top on mobile so it sits over the page instead of scrolling
    // away; the desktop header stays in normal flow.
    <header className="sticky top-0 z-50 border-b border-solid border-neutral-200 bg-white px-4 py-6 desk:static desk:px-8">
      <div className="mx-auto flex w-full max-w-[1216px] items-center justify-between">
        {/* Logo + primary nav */}
        <div className="flex items-center gap-12">
          <Link href="/" className="block h-[28px] w-[100px] shrink-0" aria-label="Cogrea home">
            <Image
              src="/assets/cogrea-logo.svg"
              alt="Cogrea"
              width={100}
              height={28}
              priority
              unoptimized
              className="block h-full w-full"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center justify-center gap-6 desk:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-center p-2 type-p-md-medium text-center text-neutral-700 transition-colors hover:text-primary-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop utilities */}
        <div className="hidden items-center gap-6 desk:flex">
          <LanguageSelector size="md" />
          <div className="flex items-center gap-6">
            <CtaButton href="/sign-in" variant="secondary" contentClassName="px-8 py-2">
              Sign In
            </CtaButton>
            <CtaButton href="/get-started" variant="primary" contentClassName="px-6 py-2">
              Get Started
            </CtaButton>
          </div>
        </div>

        {/* Mobile utilities */}
        <div className="flex items-start gap-4 desk:hidden">
          <LanguageSelector size="sm" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex items-center rounded-lg bg-primary-500 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <Image
              src={menuOpen ? "/assets/icons/close.svg" : "/assets/icons/menu.svg"}
              alt=""
              width={24}
              height={24}
              unoptimized
              className="block size-6"
            />
          </button>
        </div>
      </div>

      {/* Expanded mobile menu — not specified in the Figma frames. Absolutely
          positioned so it overlays the page rather than pushing it down. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-solid border-neutral-200 bg-white px-4 pb-6 pt-6 shadow-ds-md desk:hidden"
        >
          <nav aria-label="Main" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="p-2 type-p-md-medium text-neutral-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-4">
            <CtaButton href="/sign-in" variant="secondary" contentClassName="px-8 py-3">
              Sign In
            </CtaButton>
            <CtaButton href="/get-started" variant="primary" contentClassName="px-8 py-3">
              Get Started
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}

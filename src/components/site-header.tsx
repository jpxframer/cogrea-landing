"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CtaButton } from "@/components/ui/cta-button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { localePath, type LocaleSegment } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteHeaderProps = { lang: LocaleSegment; dict: Dictionary };

export function SiteHeader({ lang, dict }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const home = localePath(lang);

  // Root-relative so they resolve from /legal/* and any locale sub-route.
  const navLinks = [
    { label: dict.nav.about, href: `${home}#about` },
    { label: dict.nav.features, href: `${home}#features` },
    { label: dict.nav.howItWorks, href: `${home}#how-it-works` },
    { label: dict.nav.getTheApp, href: `${home}#get-the-app` },
  ];

  return (
    // Pinned to the top at every breakpoint so the page scrolls underneath it.
    <header className="sticky top-0 z-50 border-b border-solid border-neutral-200 bg-white px-4 py-6 desk:px-8">
      <div className="mx-auto flex w-full max-w-[1216px] items-center justify-between">
        {/* Logo + primary nav */}
        <div className="flex items-center gap-12">
          <Link href={home} className="block h-[28px] w-[100px] shrink-0" aria-label={dict.nav.home}>
            <Image
              src="/assets/cogrea-logo.svg"
              alt="Cogrea"
              width={100}
              height={28}
              preload
              unoptimized
              className="block h-full w-full"
            />
          </Link>

          <nav aria-label={dict.nav.main} className="hidden items-center justify-center gap-6 desk:flex">
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
          <LanguageSelector size="md" lang={lang} dict={dict.language} />
          <div className="flex items-center gap-6">
            <CtaButton
              href={localePath(lang, "/sign-in")}
              variant="secondary"
              contentClassName="px-8 py-2"
            >
              {dict.nav.signIn}
            </CtaButton>
            <CtaButton
              href={localePath(lang, "/get-started")}
              variant="primary"
              contentClassName="px-6 py-2"
            >
              {dict.nav.getStarted}
            </CtaButton>
          </div>
        </div>

        {/* Mobile utilities */}
        <div className="flex items-start gap-4 desk:hidden">
          <LanguageSelector size="sm" lang={lang} dict={dict.language} />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
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
          <nav aria-label={dict.nav.main} className="flex flex-col gap-2">
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
            <CtaButton
              href={localePath(lang, "/sign-in")}
              variant="secondary"
              contentClassName="px-8 py-3"
            >
              {dict.nav.signIn}
            </CtaButton>
            <CtaButton
              href={localePath(lang, "/get-started")}
              variant="primary"
              contentClassName="px-8 py-3"
            >
              {dict.nav.getStarted}
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}

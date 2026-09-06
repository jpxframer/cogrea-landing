import Image from "next/image";
import Link from "next/link";

import { StoreBadges } from "@/components/ui/store-badges";
import { localePath, type LocaleSegment } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type SiteFooterProps = {
  lang: LocaleSegment;
  dict: Dictionary["footer"];
  badges: Dictionary["storeBadges"];
};

export function SiteFooter({ lang, dict, badges }: SiteFooterProps) {
  const home = localePath(lang);

  const linkColumns = [
    {
      title: dict.menu,
      links: [
        { label: dict.howItWorks, href: `${home}#how-it-works` },
        { label: dict.whoWeHelp, href: `${home}#audiences` },
        { label: dict.features, href: `${home}#features` },
      ],
    },
    {
      title: dict.legal,
      links: [
        { label: dict.terms, href: localePath(lang, "/legal/terms") },
        { label: dict.privacy, href: localePath(lang, "/legal/privacy") },
        { label: dict.contact, href: localePath(lang, "/contact") },
      ],
    },
  ];

  return (
    <footer className="px-4 py-[50px] desk:px-8 desk:py-[100px]">
      <div className="mx-auto flex w-full max-w-[420px] flex-col gap-6 desk:max-w-[1216px]">
        <div className="flex flex-col gap-12 border-b border-solid border-neutral-300 pb-12 desk:flex-row desk:items-center desk:justify-between desk:gap-8">
          <div className="flex flex-col gap-5 desk:w-[592px]">
            <div className="flex flex-col gap-4">
              <Link href={home} className="block h-[28px] w-[100px]" aria-label="Cogrea">
                <Image
                  src="/assets/cogrea-logo.svg"
                  alt="Cogrea"
                  width={100}
                  height={28}
                  unoptimized
                  className="block h-full w-full"
                />
              </Link>
              <p className="type-p-lg w-full text-neutral-500">{dict.tagline}</p>
            </div>
            <StoreBadges dict={badges} />
          </div>

          <nav aria-label={dict.nav} className="flex items-start gap-[14px]">
            {linkColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-1">
                {/* Figma indents these headings with two leading spaces to line
                    them up with the links' 8px padding; px-2 does it exactly. */}
                <h2 className="type-h6-desktop px-2 text-neutral-900">{column.title}</h2>
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="type-p-md-medium whitespace-nowrap p-2 text-neutral-500 transition-colors hover:text-primary-500"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* Oversized wordmark closing the page — the same artwork as the hero's. */}
        <Image
          src="/assets/hero-wordmark.svg"
          alt=""
          width={1216}
          height={340}
          unoptimized
          className="block aspect-[100/28] w-full"
        />
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type StoreBadgesProps = {
  dict: Dictionary["storeBadges"];
  className?: string;
  labelClassName?: string;
};

/**
 * "Download The Mobile App" above the two store badges. Shared by the Get
 * Started section and the footer, which differ only in label alignment.
 */
export function StoreBadges({ dict, className, labelClassName }: StoreBadgesProps) {
  // The apps are not published yet, so these are placeholder routes.
  const badges = [
    {
      href: "/download/google-play",
      src: "/assets/badge-google-play.svg",
      alt: dict.googlePlay,
      width: 135,
    },
    {
      href: "/download/app-store",
      src: "/assets/badge-app-store.svg",
      alt: dict.appStore,
      width: 120,
    },
  ];

  return (
    <div className={cn("flex w-[273px] flex-col gap-4", className)}>
      <p className={cn("type-p-md w-full text-neutral-500", labelClassName)}>{dict.label}</p>
      <div className="flex w-full items-start gap-1.5">
        {badges.map((badge) => (
          <Link
            key={badge.href}
            href={badge.href}
            className="relative block h-10 min-w-0 flex-1 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <Image
              src={badge.src}
              alt={badge.alt}
              width={badge.width}
              height={40}
              unoptimized
              // object-contain keeps the trademarked badges from stretching into
              // the equal-width slots Figma gives them.
              className="h-full w-full object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

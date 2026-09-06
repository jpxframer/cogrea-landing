import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

// The apps are not published yet, so these are placeholder routes.
const badges = [
  {
    href: "/download/google-play",
    src: "/assets/badge-google-play.svg",
    alt: "Get it on Google Play",
    width: 135,
  },
  {
    href: "/download/app-store",
    src: "/assets/badge-app-store.svg",
    alt: "Download on the App Store",
    width: 120,
  },
];

type StoreBadgesProps = {
  className?: string;
  labelClassName?: string;
};

/**
 * "Download The Mobile App" above the two store badges. Shared by the Get
 * Started section and the footer, which differ only in label alignment.
 */
export function StoreBadges({ className, labelClassName }: StoreBadgesProps) {
  return (
    <div className={cn("flex w-[273px] flex-col gap-4", className)}>
      <p className={cn("type-p-md w-full text-neutral-500", labelClassName)}>
        Download The Mobile App
      </p>
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

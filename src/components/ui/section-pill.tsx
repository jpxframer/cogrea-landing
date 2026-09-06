import Image from "next/image";

import { cn } from "@/lib/cn";

type SectionPillProps = {
  children: React.ReactNode;
  /** 16x16 glyph shown in the badge. Defaults to the Cogrea mark. */
  icon?: string;
  className?: string;
};

/** The rounded badge that labels each landing section (Figma: 18728:23038). */
export function SectionPill({
  children,
  icon = "/assets/icons/cogea-mark.svg",
  className,
}: SectionPillProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start self-start rounded-[99px] bg-white px-6 py-2 shadow-ds-md",
        className,
      )}
    >
      <span className="flex w-full items-center gap-2">
        <span className="flex items-center rounded-[99px] bg-primary-150 p-1">
          <Image
            src={icon}
            alt=""
            width={16}
            height={16}
            unoptimized
            className="block size-4"
          />
        </span>
        <span className="type-p-xs whitespace-nowrap text-center text-black">{children}</span>
      </span>
    </div>
  );
}

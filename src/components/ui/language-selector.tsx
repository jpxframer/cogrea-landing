import Image from "next/image";

import { cn } from "@/lib/cn";

type LanguageSelectorProps = {
  /** "md" matches the desktop nav (16/24 label), "sm" the mobile nav (14/20). */
  size?: "sm" | "md";
  className?: string;
};

export function LanguageSelector({ size = "md", className }: LanguageSelectorProps) {
  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-label="Change language — currently US | EN"
      className={cn(
        "flex flex-col items-start justify-center rounded-lg bg-white p-2 shadow-ds-sm",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
        className,
      )}
    >
      <span className="flex w-full items-center gap-[11px]">
        <span className="flex items-center gap-1">
          {/* Figma: flag chip — 31px shell, 4px padding, 24x18 flag clipped to a 2px radius */}
          <span className="flex w-[31px] flex-col items-start rounded p-1 shadow-ds-md">
            <span className="relative aspect-[24/18] w-full overflow-hidden rounded-sm bg-white">
              <Image
                src="/assets/icons/flag-us.svg"
                alt=""
                width={24}
                height={18}
                unoptimized
                className="absolute left-0 top-0 h-[18px] w-[24px] max-w-none"
              />
            </span>
          </span>
          <span
            className={cn(
              "whitespace-nowrap text-center text-neutral-500",
              size === "md" ? "type-p-md-medium" : "type-p-sm-medium",
            )}
          >
            US | EN
          </span>
        </span>
        {/* Figma: arrow-down-01-sharp — 16x16 frame, 9.5x5.29 glyph */}
        <span className="relative size-4 shrink-0 overflow-hidden">
          <Image
            src="/assets/icons/chevron-down.svg"
            alt=""
            width={10}
            height={6}
            unoptimized
            className="absolute left-[3.25px] top-[5.25px] h-[5.29289px] w-[9.5px] max-w-none"
          />
        </span>
      </span>
    </button>
  );
}

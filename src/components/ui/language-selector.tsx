"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { LanguageDialog } from "@/components/ui/language-dialog";
import {
  getLocale,
  localePath,
  stripLocale,
  type Locale,
  type LocaleSegment,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

type LanguageSelectorProps = {
  lang: LocaleSegment;
  dict: Dictionary["language"];
  /** "md" matches the desktop nav (16/24 label), "sm" the mobile nav (14/20). */
  size?: "sm" | "md";
  className?: string;
};

export function LanguageSelector({ lang, dict, size = "md", className }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const locale = getLocale(lang);

  // The locale lives in the URL, so switching is a navigation. Nothing is
  // stored — returning later starts on the default English site again.
  const confirm = (next: Locale) => {
    setOpen(false);
    router.push(localePath(next.segment, stripLocale(pathname)));
  };

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={dict.trigger.replace("{label}", locale.label)}
        onClick={() => setOpen(true)}
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
                  src={locale.flag}
                  alt=""
                  width={24}
                  height={18}
                  unoptimized
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </span>
            </span>
            <span
              className={cn(
                "whitespace-nowrap text-center text-neutral-500",
                size === "md" ? "type-p-md-medium" : "type-p-sm-medium",
              )}
            >
              {locale.short}
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

      <LanguageDialog
        open={open}
        current={locale}
        dict={dict}
        onClose={() => setOpen(false)}
        onConfirm={confirm}
      />
    </>
  );
}
